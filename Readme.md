# AWS Step Functions versus Azure Logic Apps

This is a free lab that takes 30 minutes to complete. Make sure you terminate all the services at the end of this lab. 

***Uses material from and is based on this [AWS Tutorial](https://aws.amazon.com/tutorials/create-a-serverless-workflow-step-functions-lambda/), which uses the example of a IT support process***

## Overview

In this tutorial, you will:
- Create a Step Functions state machine that describes a "Sorting Hat" 
- Create a few simple AWS Lambda functions that simulate what the Sorting Hat is thinking
- Perform several tests of your workflow to observe how it responds to different inputs
- Delete the AWS resources you used to cleanup!

- **AWS IAM -** You will use the [AWS Identity and Access Management (IAM) service](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) to securely give our services the required permissions to interact with each other.
- **AWS Step Functions -** You will use [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) to demonstrate a logical workflow 
- **AWS Lambda -** You will use the compute service [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html), to create simulate the Sorting Hat's thoughts.

## Step 0: Before You Start

You will need to make sure you have the following components installed and set up before you start:

**AWS Account –** Sign up for a free AWS account [here.](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

**Required IAM permissions** – With the personal AWS Free Account, you have the administrator permissions required to create and edit IAM policies. In any other kind of AWS account, the IAM security principal that you're using must have permissions to work with AWS Lambda IAM roles and service linked roles. You must complete all steps in this guide as the same user.

1. Open the [IAM Management Console](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/home), selecting **Roles** from the left-hand side, and then choose **Create role**
![](/images/IAM.png)

2. On the **Create role** screen, under **Use case**, search and select *Step Functions*, then choose **Next**

3. Click **Next** until you get to the **Name, review, and create section**, then enter *step_functions_basic_execution* as the **Role name** then click **Create**

## Step 1: Create and deploy AWS Lambda functions

1. Open the [AWS Lambda console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions) and click on **Create function**

2. Select **Author from scratch** and configure with the following settings:
     - **Name** - SortingHatResult
     - **Runtime** - Node.js 20.x
     - **Architecture** - x86_64
![](/images/create_lambda.png)

3. Replace the contents of the **Function code** window with the following code, also listed [here](functions/result.js) and press **Deploy** 
![](/images/edit_lambda.png)

4. Repeat Steps 2 and 3, but this time naming the function **SortingHatDeliberation** and replacing the default code with the following, also listed [here](functions/deliberations.js)
  
## Step 2: Create state machine and workflow

1. Open the [AWS Step Functions console](https://console.aws.amazon.com/states/home#/statemachines), and begin by dragging the **AWS Invoke Lambda** state
![](/images/invoke_state.png)

2. Click on your new **Invoke Lambda** state, and in the *Function name* dropdown, select your Lambda function, **SortingHatDeliberation**

3. Under the *Flow* tab, select the **Choice** state and create two rules, editing the conditions so that:
     - **Rule #1** variable `$.astral` matches the string *moon*
     - **Rule #2** variable `$.astral` matches the string *stars*
![](/images/choice_state.png)
![](/images/choice.png)
![](/images/rule.png)

4. Under the two new choices, add another **Choice** state for each

5. In the **Choice** state under the `$.astral ~= "moon"`, create two rules, editing the conditions such that:
     - **Rule #1** variable `$.time` matches the string *dawn*
     - **Rule #2** variable `$.time` matches the string *dusk*

6. In the **Choice** state under the `$.astral ~= "stars"`, create two rules, editing the conditions such that:
     - **Rule #1** variable `$.creature` matches the string *centaur*
     - **Rule #2** variable `$.creature` matches the string *werewolf*

7. Add **Invoke Lambda** states for each respective choice, selecting the **SortingHatResult** function name

8. Add a **Fail** state under the **Invoke Lambda** state with the following two conditions satisfied: `$.astral ~= "stars"` and `$.creature ~= "werewolf"`

9. Navigate to the **Config** section and under *execution role*, select the IAM role you created, **step_functions_basic_execution**
![](/images/config.png)

10. In the end, your workflow should look something like this:
![](/images/diagram.png)

## Step 3: Testing out the workflow
1. Choose **Start execution**

2. In the **New execution** dialog box that appears, input the following **JSON**, or whatever your answers would be if you had to choose been *Moon versus Stars*, *Centaur versus Werewolf*, and *Dawn versus Dusk*. 
```
{
    "astral": "moon",
    "time": "dusk",
    "creature": "werewolf"
}
```
![](/images/execution.png)

3. As your workflow executes, each step will change color in the **Visual workflow** pane. Wait a few seconds for the execution to complete, then in the **Execution details** pane, choose **Execution input** and **Execution output** to view the inputs and results of your workflow

4. To test out the failed state, make the **JSON** the following:
```
{
     "astral": "stars",
     "time": "dusk",
     "creature": "werewolf"
}
```
*Note: the `time` variable can also be `"time": "dawn"`*

## Step 4: Delete Services

##### All the services utilized leverage the Free tier of the AWS Account. This will incur no additional cost to your subscription.

To delete the services, go to the individually listed services (**Lambda** and **Step Functions**) section of this lab on your AWS Management Console and delete them.
