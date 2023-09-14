# AWS Emerging Tech CDK Constructs

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->

## Table of contents

- [Introduction](#introduction)
- [CDK Versions](#cdk-versions)
- [Contributing](#contributing)
- [Adding new constructs](#design-guidelines-and-development-guide)
- [Sample Use Cases](#sample-use-cases)
- [Roadmap](#roadmap)

# Introduction

The AWS Emerging Tech Constructs library is an open-source extension of the AWS Cloud Development Kit (AWS CDK) that provides multi-service, well-architected patterns for quickly defining solutions in code to create predictable and repeatable infrastructure. The goal of AWS Emerging Tech Constructs is to accelerate the experience for developers to build solutions of any size using pattern-based definitions for their architecture, around emerging technologies (Generative AI, IoT, Spatial, Robotics, AI/ML)

The patterns defined in AWS Emerging Tech Constructs are high level, multi-service abstractions of AWS CDK constructs that have default configurations based on well-architected best practices. The library is organized into logical modules using object-oriented techniques to create each architectural pattern model.

# CDK Versions

AWS Emerging Tech Constructs and the AWS CDK are independent teams and have different release schedules. Each release of AWS Emerging Tech Constructs is built against a specific version of the AWS CDK. The [CHANGELOG.md](./CHANGELOG.md) file lists the CDK version associated with each AWS Emerging Tech Constructs release. For instance, AWS Emerging Tech Constructs v1.0.0 was built against AWS CDK v2.93.0. This means that to use AWS Emerging Tech Constructs v1.0.0, your application must include AWS CDK v2.93.0 or later. You can continue to use the latest AWS CDK versions and upgrade the your AWS Emerging Tech Constructs version when new releases become available.

# Contributing

Contributions of all kinds are welcome! Check out our [contributor's guide](./CONTRIBUTING.md)

# Design guidelines and Development guide

If you want to add a new construct to the library, check out our first our [design guidelines](./DESIGN_GUIDELINES.md), then follow the [development guide](./DEVELOPER_GUIDE.md)

# Sample Use Cases

This library includes a collection of functional use case implementations to demonstrate the usage of AWS Emerging Tech Constructs architectural patterns. These can be used in the same way as architectural patterns, and can be conceptualized as an additional "higher-level" abstraction of those patterns. The following use cases are provided as functional examples:

- Document summarization pipeline: TODO

# Roadmap

TODO

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
