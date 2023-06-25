# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
**Informed guesses:
- Each Agent can work for more than one Facility;
- The Custon Agent Id can be a String;
- We need to create a CRUD to the task; 
- Exists a function (getShiftsAndAgentsInfoByFacility - Called with Facility's id) which the query already joins the Shifts info with Agents info.

## Ticket 1: Create CustomAgentId Table in database:

**Task Description: 
- As we need to return the new custom agent id in the reports, the first thing to do is start to save that info in our database;

**Acceptance Criteria:
- It's necessary to storage the custom agent id in database, be aware that a agent can work for more than one facility; 
- The Custon Agent Id can be a String;
- It's important to easily acess the custons ids from the internal agent id and from the facility id;

**Implementation details:
- Create a new Table named CustomAgentId with these fields:
- id (Id Type - Primary Key);
- original_agent_id (Id Type - External Key for Agents Table - Not Unique);
- facility_id (Id Type - External Key for Facilities Table - Not Unique);
- custom_agent_id (String Type - Not Unique); 

**Effort estimates:
- 3 Hours/1 Point;

## Ticket 2: Create CRUD for CustomAgentId Table manipulation:

**Task Description: 
- It`s necessary to create a CRUD in our software to allow us to easily manipulate the custom agents ids and prepare the software for a future User Interface;

**Acceptance Criteria:
- It's necessary to Create, Read, Update and Delete custom agent ids in database; 
- We need to have functions to return custom agent ids from Internal Agent Id and from Facility Id;
- Integration Tests are mandatory;

**Implementation details:
- Create a CRUD to manipulate the data in CustomAgentId Table;
- Create GetCustomAgentIdByInternalAgentId is called with the Agents's id, returning all Custom Agent Ids and from each Facility they are; 
- Create GetCustomAgentIdByFacilityId is called with the Facilities's id, returning all Custom Agent Ids and from each Internal Agent Id they are;
- Create Integration Tests for each function;

**Effort estimates:
- 12 Hours/5 Points;

## Ticket 3: Update getShiftsAndAgentsInfoByFacility function:

**Task Description: 
- It`s necessary to update getShiftsAndAgentsInfoByFacility function to return each custom agent id for each shift when available;

**Acceptance Criteria:
- The getShiftsAndAgentsInfoByFacility function needs to return the custom agent id with the metadata about the Agent assigned to each Shift, when available;
- Integration Tests are mandatory;

**Implementation details:
- Change getShiftsAndAgentsInfoByFacility function's query to join the CustomAgentId Table info with the Ids from Agents Table and Facility Id received;

**Effort estimates:
- 6 Hours/2 Points;

## Ticket 4: Update generateReport function:

**Task Description: 
- It`s necessary to update generateReport to set the Custom Agent Id in generated PDF when available;

**Acceptance Criteria:
- The generateReport function needs to set the custom agent id with the metadata about the Agent when generating the PDF file;
- Unit Tests are mandatory;

**Implementation details:
- Change generateReport to use customAgentId property inside the received array of object when generating the PDF file;

**Effort estimates:
- 6 Hours/2 Points;