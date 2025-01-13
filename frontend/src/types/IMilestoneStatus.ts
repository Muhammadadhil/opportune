export enum MilestoneStatus {
    UNPAID = "unpaid", // Milestone awaiting payment
    ACTIVE = "active", // Milestone funded and ready to work
    COMPLETED = "completed", // Milestone work submitted and approved
    FAILED = "failed", // Milestone rejected or not completed
    SUBMITTED = "submitted", // Milestone work submitted
}
