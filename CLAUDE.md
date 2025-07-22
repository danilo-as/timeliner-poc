# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Proof of Concept (PoC) project for Timeliner, built using AWS CDK with TypeScript. The infrastructure is deployed using AWS Cloud Development Kit (CDK).

### AWS Profile
This project uses the AWS profile `TIMELINER_DEV` for all AWS operations. Ensure this profile is configured in your AWS credentials before running any CDK commands.

## Development Commands

### Build and Development
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile in development mode

### CDK Commands
All CDK commands are pre-configured to use the `TIMELINER_DEV` AWS profile:
- `npm run synth` - Synthesize the CloudFormation template
- `npm run deploy` - Deploy the stack to AWS
- `npm run diff` - Compare deployed stack with current state
- `npm run bootstrap` - Bootstrap CDK resources in AWS account/region (first time only)
- `npm run destroy` - Remove the deployed stack
- `npm run cdk` - Run CDK CLI with the TIMELINER_DEV profile

Note: If you need to use CDK directly, remember to include the profile:
- `npx cdk deploy --profile TIMELINER_DEV`
- `npx cdk destroy --profile TIMELINER_DEV`

## Project Structure

```
timeliner-poc/
├── bin/                    # CDK app entry point
│   └── timeliner-poc.ts   # Main CDK application file
├── src/                    # CDK stack definitions
│   └── timeliner-poc-stack.ts  # Main stack definition
├── cdk.json               # CDK configuration
└── tsconfig.json          # TypeScript configuration
```

## Key Architecture Components

### CDK Stack Structure
- Main stack is defined in `src/timeliner-poc-stack.ts`
- Entry point is `bin/timeliner-poc.ts` which instantiates the stack
- Stack name: `TimelinerPocStack`

### Development Workflow
1. Ensure AWS profile `TIMELINER_DEV` is configured: `aws configure --profile TIMELINER_DEV`
2. Implement infrastructure changes in `src/timeliner-poc-stack.ts`
3. Run `npm run build` to compile TypeScript
4. Run `npm run synth` to generate CloudFormation template
5. Review changes with `npm run diff`
6. Deploy with `npm run deploy`

## AWS CDK Best Practices for this Project

- Always specify resource removal policies for stateful resources
- Use environment-specific configuration through CDK context
- Tag all resources appropriately for cost tracking
- Implement proper IAM roles and policies following least privilege principle
- Use CDK constructs and patterns where possible instead of raw CloudFormation

## Git Commit Standards

This project uses [Conventional Commits](https://www.conventionalcommits.org/) standard enforced by commitlint. All commit messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples
- `feat: add S3 bucket for storing timelines`
- `fix: correct IAM policy for Lambda function`
- `docs: update deployment instructions`
- `refactor(stack): simplify VPC configuration`
- `chore: update AWS CDK to latest version`

### Commit Rules
- Type must be lowercase
- Description must not end with a period
- Header must not exceed 100 characters
- Body must have a blank line before it
- Footer must have a blank line before it

Commits are automatically validated using husky and commitlint hooks.

