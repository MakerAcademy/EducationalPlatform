---
title: Monitoring Collateral Types and Vaults
description: Learn how to monitor Maker Protocol State
components:
  - vaults
  - dai-js
tags:
  - vaults
  - protocol state
  - ratios
  - collateral price
slug: monitoring-collateral-types-and-vaults
contentType: guides
root: false
---

# Monitoring Collateral Types and Vaults

Level: Intermediate  
Estimated Time: 45 minutes

- [Monitoring Collateral Types and Vaults](#monitoring-collateral-types-and-vaults)
  - [Overview](#overview)
  - [Learning objectives](#learning-objectives)
  - [Pre-requisites](#pre-requisites)
  - [Guide](#guide)
    - [Collateral Types](#collateral-types)
      - [Example](#example)
    - [Vaults](#vaults)
      - [Example](#example-1)
  - [Summary](#summary)
  - [Troubleshooting](#troubleshooting)
  - [Next steps](#next-steps)
  - [Resources](#resources)

## Overview

Monitoring part of the Maker Protocol state is an important part of servicing users of the protocol, such as Vault owners. Proactive monitoring is recommended and has the potential to save Vault owners from liquidation and high stability fees. This guide will highlight the locations of relevant data as implemented in smart contract Solidity code, so it is up to the reader to choose which API is used to access that data. Some notable APIs are Dai.js and Pymaker; more generalized Web3 libraries can be used, though without the valuable utility functions that are exposed in the former two APIs. Moreover, because they abstract away much of the complexity of data transformation, we strongly recommend trying to work with [Dai.js](/documentation/introduction-to-dai-js) or [Pymaker](/documentation/introduction-to-dai-js) before attempting to read the state directly.

## Learning objectives

After going through this guide, you will gain a better understanding of:

- How to monitor the state and health of a particular Vault
- How to monitor relevant risk parameters

## Pre-requisites

[Maker Protocol 101](https://github.com/makerdao/developerguides/blob/master/mcd/mcd-101/mcd-101.md), especially:

- Vault basics.
- Governance Risk parameters.

## Guide

Mainnet addresses to contracts mentioned below can be found in the [latest release](https://changelog.makerdao.com/) of the Maker Protocol. To see the contract solidity code, go to etherscan.io, click on the `Contract` tab, and finally select the `Code` card. When reading numeric values, remember to account for their magnitudes. Of the fixed point integers:

- `wad` - 18 decimal places
- `ray` - 27 decimal places
- `rad` - 45 decimal places

### Collateral Types

Every [Collateral type](https://github.com/makerdao/developerguides/blob/kenton_dev/vault/vault-integration-guide/vault-integration-guide.md#collateral-types) state is stored in the `Ilk` data structure in the [Vat](https://github.com/makerdao/dss/blob/master/src/vat.sol), the central accounting contract of the Maker Protocol.

```solidity
struct Ilk {
    uint256 Art;   // Total Normalised Debt     [wad]
    uint256 rate;  // Accumulated Rates         [ray]
    uint256 spot;  // Price with Safety Margin  [ray]
    uint256 line;  // Debt Ceiling              [rad]
    uint256 dust;  // Urn Debt Floor            [rad]
}
```

The state of a particular `Ilk` can be found through the `ilks` mapping:

```solidity
mapping (bytes32 => Ilk)                       public ilks;
```

On the mapping, the first argument is a `bytes32` representation of the [collateral type](https://github.com/makerdao/developerguides/blob/kenton_dev/vault/vault-integration-guide/vault-integration-guide.md#collateral-types).
Once you can read the `Ilk` struct in the Vat, you have access to most of its risk parameters. The other important risk parameters, such as the stability fee, liquidation penalty, and liquidation ratio, can be found in similar `Ilk` structs in the [Jug](https://github.com/makerdao/dss/blob/master/src/jug.sol), [Cat](https://github.com/makerdao/dss/blob/master/src/cat.sol), and [Spot](https://github.com/makerdao/dss/blob/master/src/spot.sol) contracts, respectively. Similar to the Vat, each contract has their own `ilks` mapping.

In the Jug:

```solidity
struct Ilk {
    uint256 duty;  // Collateral-specific, per-second stability fee contribution [ray]
    uint256  rho;  // Time of last drip [unix epoch time]
}
```

In the Cat:

```solidity
struct Ilk {
    address flip;  // Liquidator
    uint256 chop;  // Liquidation Penalty   [ray]
    uint256 lump;  // Liquidation Quantity  [wad]
}
```

In the Spot:

```solidity
struct Ilk {
    PipLike pip;  // Price Feed
    uint256 mat;  // Liquidation ratio [ray]
}
```

#### Example

Here's a non-exhaustive example of reading common risk parameters of a collateral type within the Maker Protocol. Data location is shown in pseudocode and follows this format: `Contract.function(...).variable`.

```bash
Collateral Type = Ilk = bytes32(`ETH-A`) = 0x4554482d41000000000000000000000000000000000000000000000000000000
```

The Maker Protocol pulls recent price data from the [Oracle Security Module (OSM)](/documentation/osm-detailed-documentation) to properly value the assets it accepts as collateral. The sole purpose of the OSM is to delay price feed updates and protect the system from oracle attacks. Thus, the price used to evaluate a Vault’s state is delayed by a predetermined amount of time (e.g. 1 hour). Moreover, as was designed, the Liquidation Ratio, which is the minimum Vault Collateralization Ratio before liquidation, is baked into the price and stored in the Vat. As a result, the Collateral Price is delayed, has a “safety margin” that’s in size to the Liquidation Ratio, and is used directly when evaluating a Vault’s health.

```bash
Delayed Collateral Price price w/ safety margin = Vat.ilks(Ilk).spot = 150 x 10^27 ($150)

Liquidation Ratio = Spot.ilks(Ilk).mat = 1.50 x 10^27 (150%)

Delayed Collateral Price = Delayed Collateral Price w/ safety margin * Liquidation Ratio = 150 * 1.5 = 225 ETH / USD

Liquidation Penalty = Cat.ilks(Ilk).chop = 1.13 * 10^27 = 13%
```

All collateral types are charged a stability fee, which is the combination of two fee contributions: a collateral-specific fee and a global fee. The combination of the two results in a “debt multiplier” that when multiplied by a Vault’s normalized internal Dai (`urn.art`) gives the total amount of debt at any time. Each collateral type has a debt multiplier (`ilk.rate`) that continuously, but irregularly, updates in the Vat. This is one of the more important, fundamental mechanisms within the Maker Protocol, so if you have time, we recommend reading more on the [Rates Module](/documentation/introduction-to-rates-module).

```bash
Global, per-second stability fee contribution = Jug.base = 0.0000 x 10^27

Collateral-specific, per-second stability fee contribution  = Jug.ilks(Ilk).duty = 1.000000001847694957439350562 x 10^27
```

Although the total stability fee is the sum of the global and collateral specific fee, the latter (known as "duty") is currently the only contributing factor to the fee, as the global fee is set to 0.

```bash
Stability Fee per second = Global + Collateral-specific, per second stability fee contributions = 0.0000 x 10^27 + 1.000000001847694957439350562 x 10^27

Stability Fee per year = Stability Fee per second ^ 31536000 seconds in a year (365 days x 24 hours x 60 minutes x 60 seconds) = 1.06 or 6% per year
```

### Vaults

Similar to the Ilk, every Vault state is stored in the `Urn` data structure in the [Vat](https://github.com/makerdao/dss/blob/master/src/vat.sol).

```bash
struct Urn {
    uint256 ink;   // Locked Collateral  [wad]
    uint256 art;   // Normalised Debt    [wad]
}
```

Acting as an alias to Vault state, a particular `Urn` state can be found through the `urns` mapping:

```bash
mapping (bytes32 => mapping (address => Urn )) public urns;
```

On the mapping, the first argument is a `bytes32` representation of the [collateral type](https://github.com/makerdao/developerguides/blob/kenton_dev/vault/vault-integration-guide/vault-integration-guide.md#collateral-types), while the second argument is the user's Ethereum address.

You may notice that an Ethereum address only has access to a single `Urn` for each `Ilk` Collateral type. The CDP-Manager exists to circumvent this constraint. The [CDP-Manager](https://github.com/makerdao/dss-cdp-manager/blob/master/src/DssCdpManager.sol) manages a list of `UrnHandlers`, which is a simple contract that has a single goal of being owned by an Ethereum address and holds ownership of an `Urn`. In other words, with the CDP-Manager, one could own multiple `UrnHandlers` and thus `open(...)` multiple `urns` for each `Ilk`. Although CDP-Manager can be used manually, most interactions are conducted through a [DSProxy](https://github.com/makerdao/developerguides/blob/master/devtools/working-with-dsproxy/working-with-dsproxy.md), a proxy contract used to execute atomic transactions, and [DssProxyActions](https://github.com/makerdao/dss-cdp-manager), an atomic transaction library.

#### Example

Since it’s the most complex and more commonly used, the following example for reading the state of an `Urn` with a proxy identity is used; if the proxy identity owns multiple `urns` through the CDPManager, it will read the list through the [GetCDPs contract](https://github.com/makerdao/dss-cdp-manager/blob/master/src/GetCdps.sol). Data location is shown in pseudocode and follows this format: `Contract.function(...).variable`. Assuming that a DSProxy has already been built for a particular User Address:

```bash
UserAddress = ‘0x123ABC….’
DSProxyAddress = ProxyRegistry.proxies(UserAddress)

(CDPIDs, UrnHandlerAddresses, Ilks) = GetCDPs.getCdpsAsc(CDPManager, DSProxyAddress)

urn1 = Vat.urns(UrnHandlerAddresses[0],Ilks[0])
urn2 = Vat.urns(UrnHandlerAddresses[1],Ilks[1])
…

Collateral Debt Multiplier = Ilk.rate = 1.018 x 10^27

Normalized Internal Dai = urn1.art = 18.26 x 10^18

Locked Collateral = urn1.ink = 1 x 10^18

USD Debt = Normalized Internal Dai x Collateral Debt Multiplier = 18.26 x 1.018 = $18.58 (remember to normalize to a common unit)

USD Collateral = Locked Collateral x Delayed Collateral Price (from Ilk example) = 1 x 225 ETH / USD = $225 (remember to normalize to a common unit)

Collateralization Ratio = USD Collateral / USD Debt = $225 / $18.58 = 1210%
```

As supplemental education materials, here’s a [spreadsheet example](https://docs.google.com/spreadsheets/d/1fDwooo9tVftgd9Q7dVbd857Ue8demLVukFnsakl8MHE/edit?usp=sharing) as well as our [Intro to Rates Mechanism Guide](https://github.com/makerdao/developerguides/blob/master/mcd/intro-rate-mechanism/intro-rate-mechanism.md) showing how compounding rates are handled in the Maker Protocol; in addition to the [Rates Module documentation](/documentation/introduction-to-rates-module) we recommend their review when learning more about `Normalized Internal Dai` and the `Collateral Debt Multiplier`.

## Summary

In this guide, you were introduced to the locations of important data structures within the Maker Protocol, ranging from collateral types and their risk parameters to the state of Vaults.

## Troubleshooting

Run into an issue that’s not covered in this guide? Please find our contact information at the end of this guide, and we’ll add it above or to this section.

## Next steps

[Vault Integration Guide](https://github.com/makerdao/developerguides/blob/master/vault/vault-integration-guide/vault-integration-guide.md)

## Resources

[Rates Module Documentation](/documentation/introduction-to-rates-module)
[Guide: Intro to Rates Mechanism in the Maker Protocol](https://github.com/makerdao/developerguides/blob/master/mcd/intro-rate-mechanism/intro-rate-mechanism.md)
[Example: Compounding rates](https://docs.google.com/spreadsheets/d/1fDwooo9tVftgd9Q7dVbd857Ue8demLVukFnsakl8MHE/edit?usp=sharing)

Contact Integrations team - integrate@makerdao.com
Rocket chat - #dev channel
