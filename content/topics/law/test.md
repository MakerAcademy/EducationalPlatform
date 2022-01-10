---
contentType: topics
topic: law
subtopic: test
title: test
description: 'test '
level: beginner
titleURL: test
date: 'Sun Jan 09 2022 21:26:34 GMT-0500 (Eastern Standard Time)'
body: >-
  # Evading Taxes 101 TEST CHANGE


  **Level**: Advanced


  **Estimated Time**: 90 - 120 minutes


  * [Add a new collateral type to Maker Protocol -
  Kovan](#add-a-new-collateral-type-to-maker-protocol---kovan)
    * [Overview](#overview)
    * [Learning Objectives](#learning-objectives)
    * [Pre-requisites](#pre-requisites)
    * [Guide](#guide)
      * [Setup](#setup)
      * [Collateral Type](#collateral-type)
      * [Setup Spell](#setup-spell)
      * [Price Feeds](#price-feeds)
      * [Deploy Adapter](#deploy-adapter)
      * [Deploy Collateral Auction contract](#deploy-collateral-auction-contract)
      * [Calculate Risk Parameters](#calculate-risk-parameters)
      * [Deploy Spell](#deploy-spell)
      * [Governance actions](#governance-actions)
      * [Execute Spell](#execute-spell)
      * [Test Collateral Type](#test-collateral-type)
    * [Troubleshooting](#troubleshooting)
    * [Summary](#summary)
    * [Additional resources](#additional-resources)
    * [Next Steps](#next-steps)
    * [Help](#help)

  ## Overview


  The Maker Protocol deployed to the Kovan testnet supports multiple collateral
  types. You can now add a new token as a collateral type, and allow users and
  developers to test various aspects of this integration. This guide covers the
  steps involved in setting up various contracts to initialize a new collateral
  type on the testnet. Adding it to the mainnet deployment will be handled by
  risk teams and those steps will not be covered in this guide.


  ## Learning Objectives


  After going through this guide you will get a better understanding of,


  * Configuring core Maker Protocol contracts

  * Additional contracts required: Price Feed, Auction, Adapter.

  * Governance steps to initialize the new collateral type.


  ## Pre-requisites
---

# Evading Taxes 101

**Level**: Advanced

**Estimated Time**: 90 - 120 minutes

- [Add a new collateral type to Maker Protocol - Kovan](#add-a-new-collateral-type-to-maker-protocol---kovan)
  - [Overview](#overview)
  - [Learning Objectives](#learning-objectives)
  - [Pre-requisites](#pre-requisites)
  - [Guide](#guide)
    - [Setup](#setup)
    - [Collateral Type](#collateral-type)
    - [Setup Spell](#setup-spell)
    - [Price Feeds](#price-feeds)
    - [Deploy Adapter](#deploy-adapter)
    - [Deploy Collateral Auction contract](#deploy-collateral-auction-contract)
    - [Calculate Risk Parameters](#calculate-risk-parameters)
    - [Deploy Spell](#deploy-spell)
    - [Governance actions](#governance-actions)
    - [Execute Spell](#execute-spell)
    - [Test Collateral Type](#test-collateral-type)
  - [Troubleshooting](#troubleshooting)
  - [Summary](#summary)
  - [Additional resources](#additional-resources)
  - [Next Steps](#next-steps)
  - [Help](#help)

## Overview

The Maker Protocol deployed to the Kovan testnet supports multiple collateral types. You can now add a new token as a collateral type, and allow users and developers to test various aspects of this integration. This guide covers the steps involved in setting up various contracts to initialize a new collateral type on the testnet. Adding it to the mainnet deployment will be handled by risk teams and those steps will not be covered in this guide.

## Learning Objectives

After going through this guide you will get a better understanding of,

- Configuring core Maker Protocol contracts
- Additional contracts required: Price Feed, Auction, Adapter.
- Governance steps to initialize the new collateral type.

## Pre-requisites
