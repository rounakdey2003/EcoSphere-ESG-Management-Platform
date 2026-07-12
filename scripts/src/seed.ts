import { db } from "@workspace/db";
import { 
  departmentsTable,
  categoriesTable,
  employeesTable,
  emissionFactorsTable, carbonTransactionsTable, environmentalGoalsTable,
  csrActivitiesTable, employeeParticipationsTable,
  esgPoliciesTable, auditsTable, complianceIssuesTable
} from "@workspace/db/schema";

async function seed() {
  console.log("Checking if database needs seeding...");
  try {
    const existingDepts = await db.select().from(departmentsTable).limit(1);
    if (existingDepts.length > 0) {
      console.log("Database already seeded. Skipping seed process.");
      return;
    }
  } catch (error: any) {
    
    if (error.code !== '42P01') {
      throw error;
    }
  }

  console.log("Seeding database with dummy data...");

  
  const deptResult = await db.insert(departmentsTable).values([
    { name: "Engineering", code: "ENG" },
    { name: "Human Resources", code: "HR" },
    { name: "Operations", code: "OPS" }
  ]).returning();
  console.log("Inserted departments.");

  const deptEng = deptResult[0].id;
  const deptHr = deptResult[1].id;
  const deptOps = deptResult[2].id;

  
  const catResult = await db.insert(categoriesTable).values([
    { name: "Tree Planting", type: "csr_activity" },
    { name: "Community Service", type: "csr_activity" }
  ]).returning();
  console.log("Inserted categories.");

  const catTree = catResult[0].id;

  
  const empResult = await db.insert(employeesTable).values([
    { name: "Alice Smith", email: "alice@example.com", departmentId: deptEng, role: "Software Engineer", gender: "female" },
    { name: "Bob Johnson", email: "bob@example.com", departmentId: deptHr, role: "HR Manager", gender: "male" },
    { name: "Charlie Davis", email: "charlie@example.com", departmentId: deptOps, role: "Operations Lead", gender: "male" }
  ]).returning();
  console.log("Inserted employees.");

  const empAlice = empResult[0].id;
  const empBob = empResult[1].id;
  const empCharlie = empResult[2].id;

  
  const efResult = await db.insert(emissionFactorsTable).values([
    { name: "Electricity (Grid)", category: "purchase", factor: "0.5", unit: "kgCO2e/kWh" },
    { name: "Company Cars", category: "fleet", factor: "2.3", unit: "kgCO2e/liter" }
  ]).returning();
  console.log("Inserted emission factors.");

  const efElec = efResult[0].id;

  
  await db.insert(carbonTransactionsTable).values([
    { departmentId: deptEng, emissionFactorId: efElec, quantity: "1000", totalEmission: "500", source: "purchase", transactionDate: "2026-07-01", description: "Office electricity" },
    { departmentId: deptOps, emissionFactorId: efElec, quantity: "2000", totalEmission: "1000", source: "purchase", transactionDate: "2026-07-05", description: "Warehouse electricity" }
  ]);
  console.log("Inserted carbon transactions.");

  
  await db.insert(environmentalGoalsTable).values([
    { title: "Reduce Q3 Energy", departmentId: deptEng, targetValue: "500", currentValue: "100", unit: "kgCO2e", deadline: "2026-09-30", status: "active" }
  ]);
  console.log("Inserted environmental goals.");

  
  const activityResult = await db.insert(csrActivitiesTable).values([
    { title: "Local Park Cleanup", categoryId: catTree, departmentId: deptEng, points: 100, startDate: "2026-07-10", status: "active" },
    { title: "Food Drive", categoryId: catTree, departmentId: deptHr, points: 50, startDate: "2026-07-15", status: "planned" }
  ]).returning();
  console.log("Inserted CSR activities.");

  const actPark = activityResult[0].id;

  
  await db.insert(employeeParticipationsTable).values([
    { employeeId: empAlice, activityId: actPark, approvalStatus: "approved", pointsEarned: 100, completionDate: "2026-07-11" },
    { employeeId: empCharlie, activityId: actPark, approvalStatus: "pending", pointsEarned: 0 }
  ]);
  console.log("Inserted employee participations.");

  
  const policyResult = await db.insert(esgPoliciesTable).values([
    { title: "Data Privacy Policy", category: "governance", effectiveDate: "2026-01-01", status: "active" },
    { title: "Anti-Bribery Policy", category: "governance", effectiveDate: "2026-02-01", status: "active" }
  ]).returning();
  console.log("Inserted ESG policies.");

  
  const auditResult = await db.insert(auditsTable).values([
    { title: "Q3 Internal Audit", auditor: "External Firm", departmentId: deptOps, auditDate: "2026-08-01", status: "scheduled" }
  ]).returning();
  console.log("Inserted audits.");

  const auditQ3 = auditResult[0].id;

  
  await db.insert(complianceIssuesTable).values([
    { auditId: auditQ3, severity: "high", description: "Missing training records", ownerId: empBob, dueDate: "2026-07-20", status: "open" }
  ]);
  console.log("Inserted compliance issues.");

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
