import * as zod from 'zod';


export const HealthCheckResponse = zod.object({
  "status": zod.string()
})


export const ListDepartmentsResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "code": zod.string(),
  "head": zod.string().nullish(),
  "parentDepartmentId": zod.number().nullish(),
  "employeeCount": zod.number().optional(),
  "status": zod.enum(['active', 'inactive']),
  "createdAt": zod.coerce.date().optional()
})
export const ListDepartmentsResponse = zod.array(ListDepartmentsResponseItem)


export const createDepartmentBodyEmployeeCountDefault = 0;
export const createDepartmentBodyStatusDefault = `active`;

export const CreateDepartmentBody = zod.object({
  "name": zod.string(),
  "code": zod.string(),
  "head": zod.string().optional(),
  "parentDepartmentId": zod.number().optional(),
  "employeeCount": zod.number().default(createDepartmentBodyEmployeeCountDefault),
  "status": zod.enum(['active', 'inactive']).default(createDepartmentBodyStatusDefault)
})

export const CreateDepartmentResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "code": zod.string(),
  "head": zod.string().nullish(),
  "parentDepartmentId": zod.number().nullish(),
  "employeeCount": zod.number().optional(),
  "status": zod.enum(['active', 'inactive']),
  "createdAt": zod.coerce.date().optional()
})


export const GetDepartmentParams = zod.object({
  "id": zod.coerce.number()
})

export const GetDepartmentResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "code": zod.string(),
  "head": zod.string().nullish(),
  "parentDepartmentId": zod.number().nullish(),
  "employeeCount": zod.number().optional(),
  "status": zod.enum(['active', 'inactive']),
  "createdAt": zod.coerce.date().optional()
})


export const UpdateDepartmentParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateDepartmentBody = zod.object({
  "name": zod.string().optional(),
  "code": zod.string().optional(),
  "head": zod.string().optional(),
  "parentDepartmentId": zod.number().optional(),
  "employeeCount": zod.number().optional(),
  "status": zod.enum(['active', 'inactive']).optional()
})

export const UpdateDepartmentResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "code": zod.string(),
  "head": zod.string().nullish(),
  "parentDepartmentId": zod.number().nullish(),
  "employeeCount": zod.number().optional(),
  "status": zod.enum(['active', 'inactive']),
  "createdAt": zod.coerce.date().optional()
})


export const DeleteDepartmentParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteDepartmentResponse = zod.void()


export const GetDepartmentScoreParams = zod.object({
  "id": zod.coerce.number()
})

export const GetDepartmentScoreResponse = zod.object({
  "departmentId": zod.number(),
  "departmentName": zod.string().optional(),
  "environmentalScore": zod.number(),
  "socialScore": zod.number(),
  "governanceScore": zod.number(),
  "totalScore": zod.number(),
  "updatedAt": zod.coerce.date().optional()
})


export const ListCategoriesQueryParams = zod.object({
  "type": zod.enum(['csr_activity', 'challenge']).optional()
})

export const ListCategoriesResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "type": zod.enum(['csr_activity', 'challenge']),
  "status": zod.enum(['active', 'inactive'])
})
export const ListCategoriesResponse = zod.array(ListCategoriesResponseItem)


export const createCategoryBodyStatusDefault = `active`;

export const CreateCategoryBody = zod.object({
  "name": zod.string(),
  "type": zod.enum(['csr_activity', 'challenge']),
  "status": zod.enum(['active', 'inactive']).default(createCategoryBodyStatusDefault)
})

export const CreateCategoryResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "type": zod.enum(['csr_activity', 'challenge']),
  "status": zod.enum(['active', 'inactive'])
})


export const UpdateCategoryParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateCategoryBody = zod.object({
  "name": zod.string().optional(),
  "type": zod.enum(['csr_activity', 'challenge']).optional(),
  "status": zod.enum(['active', 'inactive']).optional()
})

export const UpdateCategoryResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "type": zod.enum(['csr_activity', 'challenge']),
  "status": zod.enum(['active', 'inactive'])
})


export const DeleteCategoryParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteCategoryResponse = zod.void()


export const ListEmployeesResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string(),
  "role": zod.string().optional(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "gender": zod.string().nullish(),
  "xp": zod.number().optional(),
  "totalPoints": zod.number().optional(),
  "joinedAt": zod.coerce.date().optional(),
  "status": zod.enum(['active', 'inactive']).optional()
})
export const ListEmployeesResponse = zod.array(ListEmployeesResponseItem)


export const createEmployeeBodyStatusDefault = `active`;

export const CreateEmployeeBody = zod.object({
  "name": zod.string(),
  "email": zod.string(),
  "role": zod.string().optional(),
  "departmentId": zod.number(),
  "gender": zod.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  "joinedAt": zod.coerce.date().optional(),
  "status": zod.enum(['active', 'inactive']).default(createEmployeeBodyStatusDefault)
})

export const CreateEmployeeResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string(),
  "role": zod.string().optional(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "gender": zod.string().nullish(),
  "xp": zod.number().optional(),
  "totalPoints": zod.number().optional(),
  "joinedAt": zod.coerce.date().optional(),
  "status": zod.enum(['active', 'inactive']).optional()
})


export const GetEmployeeParams = zod.object({
  "id": zod.coerce.number()
})

export const GetEmployeeResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string(),
  "role": zod.string().optional(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "gender": zod.string().nullish(),
  "xp": zod.number().optional(),
  "totalPoints": zod.number().optional(),
  "joinedAt": zod.coerce.date().optional(),
  "status": zod.enum(['active', 'inactive']).optional()
})


export const UpdateEmployeeParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateEmployeeBody = zod.object({
  "name": zod.string().optional(),
  "email": zod.string().optional(),
  "role": zod.string().optional(),
  "departmentId": zod.number().optional(),
  "gender": zod.string().optional(),
  "status": zod.string().optional()
})

export const UpdateEmployeeResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "email": zod.string(),
  "role": zod.string().optional(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "gender": zod.string().nullish(),
  "xp": zod.number().optional(),
  "totalPoints": zod.number().optional(),
  "joinedAt": zod.coerce.date().optional(),
  "status": zod.enum(['active', 'inactive']).optional()
})


export const ListEmissionFactorsResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "category": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'other']),
  "factor": zod.number(),
  "unit": zod.string(),
  "description": zod.string().nullish(),
  "isActive": zod.boolean().optional()
})
export const ListEmissionFactorsResponse = zod.array(ListEmissionFactorsResponseItem)


export const createEmissionFactorBodyIsActiveDefault = true;

export const CreateEmissionFactorBody = zod.object({
  "name": zod.string(),
  "category": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'other']),
  "factor": zod.number(),
  "unit": zod.string(),
  "description": zod.string().optional(),
  "isActive": zod.boolean().default(createEmissionFactorBodyIsActiveDefault)
})

export const CreateEmissionFactorResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "category": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'other']),
  "factor": zod.number(),
  "unit": zod.string(),
  "description": zod.string().nullish(),
  "isActive": zod.boolean().optional()
})


export const UpdateEmissionFactorParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateEmissionFactorBody = zod.object({
  "name": zod.string().optional(),
  "category": zod.string().optional(),
  "factor": zod.number().optional(),
  "unit": zod.string().optional(),
  "description": zod.string().optional(),
  "isActive": zod.boolean().optional()
})

export const UpdateEmissionFactorResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "category": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'other']),
  "factor": zod.number(),
  "unit": zod.string(),
  "description": zod.string().nullish(),
  "isActive": zod.boolean().optional()
})


export const DeleteEmissionFactorParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteEmissionFactorResponse = zod.void()


export const ListCarbonTransactionsQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "startDate": zod.date().optional(),
  "endDate": zod.date().optional()
})

export const ListCarbonTransactionsResponseItem = zod.object({
  "id": zod.number(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "emissionFactorId": zod.number(),
  "emissionFactorName": zod.string().nullish(),
  "quantity": zod.number(),
  "totalEmission": zod.number(),
  "source": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'manual']),
  "description": zod.string().nullish(),
  "transactionDate": zod.coerce.date(),
  "createdAt": zod.coerce.date().optional()
})
export const ListCarbonTransactionsResponse = zod.array(ListCarbonTransactionsResponseItem)


export const CreateCarbonTransactionBody = zod.object({
  "departmentId": zod.number(),
  "emissionFactorId": zod.number(),
  "quantity": zod.number(),
  "source": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'manual']),
  "description": zod.string().optional(),
  "transactionDate": zod.coerce.date()
})

export const CreateCarbonTransactionResponse = zod.object({
  "id": zod.number(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "emissionFactorId": zod.number(),
  "emissionFactorName": zod.string().nullish(),
  "quantity": zod.number(),
  "totalEmission": zod.number(),
  "source": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'manual']),
  "description": zod.string().nullish(),
  "transactionDate": zod.coerce.date(),
  "createdAt": zod.coerce.date().optional()
})


export const GetCarbonTransactionParams = zod.object({
  "id": zod.coerce.number()
})

export const GetCarbonTransactionResponse = zod.object({
  "id": zod.number(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "emissionFactorId": zod.number(),
  "emissionFactorName": zod.string().nullish(),
  "quantity": zod.number(),
  "totalEmission": zod.number(),
  "source": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'manual']),
  "description": zod.string().nullish(),
  "transactionDate": zod.coerce.date(),
  "createdAt": zod.coerce.date().optional()
})


export const DeleteCarbonTransactionParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteCarbonTransactionResponse = zod.void()


export const ListEnvironmentalGoalsResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "targetValue": zod.number(),
  "currentValue": zod.number(),
  "unit": zod.string(),
  "deadline": zod.coerce.date(),
  "status": zod.enum(['active', 'achieved', 'missed', 'cancelled']),
  "progressPercent": zod.number().optional()
})
export const ListEnvironmentalGoalsResponse = zod.array(ListEnvironmentalGoalsResponseItem)


export const createEnvironmentalGoalBodyCurrentValueDefault = 0;
export const createEnvironmentalGoalBodyStatusDefault = `active`;

export const CreateEnvironmentalGoalBody = zod.object({
  "title": zod.string(),
  "description": zod.string().optional(),
  "departmentId": zod.number().optional(),
  "targetValue": zod.number(),
  "currentValue": zod.number().default(createEnvironmentalGoalBodyCurrentValueDefault),
  "unit": zod.string(),
  "deadline": zod.coerce.date(),
  "status": zod.enum(['active', 'achieved', 'missed', 'cancelled']).default(createEnvironmentalGoalBodyStatusDefault)
})

export const CreateEnvironmentalGoalResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "targetValue": zod.number(),
  "currentValue": zod.number(),
  "unit": zod.string(),
  "deadline": zod.coerce.date(),
  "status": zod.enum(['active', 'achieved', 'missed', 'cancelled']),
  "progressPercent": zod.number().optional()
})


export const UpdateEnvironmentalGoalParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateEnvironmentalGoalBody = zod.object({
  "title": zod.string().optional(),
  "description": zod.string().optional(),
  "targetValue": zod.number().optional(),
  "currentValue": zod.number().optional(),
  "deadline": zod.coerce.date().optional(),
  "status": zod.string().optional()
})

export const UpdateEnvironmentalGoalResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "targetValue": zod.number(),
  "currentValue": zod.number(),
  "unit": zod.string(),
  "deadline": zod.coerce.date(),
  "status": zod.enum(['active', 'achieved', 'missed', 'cancelled']),
  "progressPercent": zod.number().optional()
})


export const DeleteEnvironmentalGoalParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteEnvironmentalGoalResponse = zod.void()


export const ListCsrActivitiesResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "points": zod.number().optional(),
  "startDate": zod.coerce.date(),
  "endDate": zod.string().nullish(),
  "status": zod.enum(['planned', 'active', 'completed', 'cancelled']),
  "participantCount": zod.number().optional()
})
export const ListCsrActivitiesResponse = zod.array(ListCsrActivitiesResponseItem)


export const createCsrActivityBodyPointsDefault = 100;
export const createCsrActivityBodyStatusDefault = `planned`;

export const CreateCsrActivityBody = zod.object({
  "title": zod.string(),
  "description": zod.string().optional(),
  "categoryId": zod.number(),
  "departmentId": zod.number().optional(),
  "points": zod.number().default(createCsrActivityBodyPointsDefault),
  "startDate": zod.coerce.date(),
  "endDate": zod.coerce.date().optional(),
  "status": zod.enum(['planned', 'active', 'completed', 'cancelled']).default(createCsrActivityBodyStatusDefault)
})

export const CreateCsrActivityResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "points": zod.number().optional(),
  "startDate": zod.coerce.date(),
  "endDate": zod.string().nullish(),
  "status": zod.enum(['planned', 'active', 'completed', 'cancelled']),
  "participantCount": zod.number().optional()
})


export const GetCsrActivityParams = zod.object({
  "id": zod.coerce.number()
})

export const GetCsrActivityResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "points": zod.number().optional(),
  "startDate": zod.coerce.date(),
  "endDate": zod.string().nullish(),
  "status": zod.enum(['planned', 'active', 'completed', 'cancelled']),
  "participantCount": zod.number().optional()
})


export const UpdateCsrActivityParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateCsrActivityBody = zod.object({
  "title": zod.string().optional(),
  "description": zod.string().optional(),
  "categoryId": zod.number().optional(),
  "departmentId": zod.number().optional(),
  "points": zod.number().optional(),
  "startDate": zod.coerce.date().optional(),
  "endDate": zod.coerce.date().optional(),
  "status": zod.string().optional()
})

export const UpdateCsrActivityResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "points": zod.number().optional(),
  "startDate": zod.coerce.date(),
  "endDate": zod.string().nullish(),
  "status": zod.enum(['planned', 'active', 'completed', 'cancelled']),
  "participantCount": zod.number().optional()
})


export const DeleteCsrActivityParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteCsrActivityResponse = zod.void()


export const ListEmployeeParticipationsQueryParams = zod.object({
  "employeeId": zod.coerce.number().optional(),
  "activityId": zod.coerce.number().optional(),
  "status": zod.coerce.string().optional()
})

export const ListEmployeeParticipationsResponseItem = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "activityId": zod.number(),
  "activityTitle": zod.string().nullish(),
  "proof": zod.string().nullish(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']),
  "pointsEarned": zod.number().optional(),
  "completionDate": zod.string().nullish(),
  "submittedAt": zod.coerce.date().optional()
})
export const ListEmployeeParticipationsResponse = zod.array(ListEmployeeParticipationsResponseItem)


export const CreateEmployeeParticipationBody = zod.object({
  "employeeId": zod.number(),
  "activityId": zod.number(),
  "proof": zod.string().optional(),
  "completionDate": zod.coerce.date().optional()
})

export const CreateEmployeeParticipationResponse = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "activityId": zod.number(),
  "activityTitle": zod.string().nullish(),
  "proof": zod.string().nullish(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']),
  "pointsEarned": zod.number().optional(),
  "completionDate": zod.string().nullish(),
  "submittedAt": zod.coerce.date().optional()
})


export const UpdateEmployeeParticipationParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateEmployeeParticipationBody = zod.object({
  "proof": zod.string().optional(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']).optional(),
  "pointsEarned": zod.number().optional(),
  "completionDate": zod.coerce.date().optional()
})

export const UpdateEmployeeParticipationResponse = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "activityId": zod.number(),
  "activityTitle": zod.string().nullish(),
  "proof": zod.string().nullish(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']),
  "pointsEarned": zod.number().optional(),
  "completionDate": zod.string().nullish(),
  "submittedAt": zod.coerce.date().optional()
})


export const ListEsgPoliciesResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "category": zod.enum(['environmental', 'social', 'governance']),
  "effectiveDate": zod.coerce.date(),
  "expiryDate": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'archived']),
  "acknowledgementCount": zod.number().optional(),
  "totalEmployees": zod.number().optional()
})
export const ListEsgPoliciesResponse = zod.array(ListEsgPoliciesResponseItem)


export const createEsgPolicyBodyStatusDefault = `draft`;

export const CreateEsgPolicyBody = zod.object({
  "title": zod.string(),
  "description": zod.string().optional(),
  "category": zod.enum(['environmental', 'social', 'governance']),
  "effectiveDate": zod.coerce.date(),
  "expiryDate": zod.coerce.date().optional(),
  "status": zod.enum(['draft', 'active', 'archived']).default(createEsgPolicyBodyStatusDefault)
})

export const CreateEsgPolicyResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "category": zod.enum(['environmental', 'social', 'governance']),
  "effectiveDate": zod.coerce.date(),
  "expiryDate": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'archived']),
  "acknowledgementCount": zod.number().optional(),
  "totalEmployees": zod.number().optional()
})


export const GetEsgPolicyParams = zod.object({
  "id": zod.coerce.number()
})

export const GetEsgPolicyResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "category": zod.enum(['environmental', 'social', 'governance']),
  "effectiveDate": zod.coerce.date(),
  "expiryDate": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'archived']),
  "acknowledgementCount": zod.number().optional(),
  "totalEmployees": zod.number().optional()
})


export const UpdateEsgPolicyParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateEsgPolicyBody = zod.object({
  "title": zod.string().optional(),
  "description": zod.string().optional(),
  "category": zod.string().optional(),
  "effectiveDate": zod.coerce.date().optional(),
  "expiryDate": zod.coerce.date().optional(),
  "status": zod.string().optional()
})

export const UpdateEsgPolicyResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "category": zod.enum(['environmental', 'social', 'governance']),
  "effectiveDate": zod.coerce.date(),
  "expiryDate": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'archived']),
  "acknowledgementCount": zod.number().optional(),
  "totalEmployees": zod.number().optional()
})


export const DeleteEsgPolicyParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteEsgPolicyResponse = zod.void()


export const ListPolicyAcknowledgementsQueryParams = zod.object({
  "policyId": zod.coerce.number().optional(),
  "employeeId": zod.coerce.number().optional()
})

export const ListPolicyAcknowledgementsResponseItem = zod.object({
  "id": zod.number(),
  "policyId": zod.number(),
  "policyTitle": zod.string().nullish(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "acknowledgedAt": zod.coerce.date()
})
export const ListPolicyAcknowledgementsResponse = zod.array(ListPolicyAcknowledgementsResponseItem)


export const CreatePolicyAcknowledgementBody = zod.object({
  "policyId": zod.number(),
  "employeeId": zod.number()
})

export const CreatePolicyAcknowledgementResponse = zod.object({
  "id": zod.number(),
  "policyId": zod.number(),
  "policyTitle": zod.string().nullish(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "acknowledgedAt": zod.coerce.date()
})


export const ListAuditsResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "auditor": zod.string(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "auditDate": zod.coerce.date(),
  "status": zod.enum(['scheduled', 'in_progress', 'completed', 'cancelled']),
  "issueCount": zod.number().optional()
})
export const ListAuditsResponse = zod.array(ListAuditsResponseItem)


export const createAuditBodyStatusDefault = `scheduled`;

export const CreateAuditBody = zod.object({
  "title": zod.string(),
  "description": zod.string().optional(),
  "auditor": zod.string(),
  "departmentId": zod.number().optional(),
  "auditDate": zod.coerce.date(),
  "status": zod.enum(['scheduled', 'in_progress', 'completed', 'cancelled']).default(createAuditBodyStatusDefault)
})

export const CreateAuditResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "auditor": zod.string(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "auditDate": zod.coerce.date(),
  "status": zod.enum(['scheduled', 'in_progress', 'completed', 'cancelled']),
  "issueCount": zod.number().optional()
})


export const GetAuditParams = zod.object({
  "id": zod.coerce.number()
})

export const GetAuditResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "auditor": zod.string(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "auditDate": zod.coerce.date(),
  "status": zod.enum(['scheduled', 'in_progress', 'completed', 'cancelled']),
  "issueCount": zod.number().optional()
})


export const UpdateAuditParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateAuditBody = zod.object({
  "title": zod.string().optional(),
  "description": zod.string().optional(),
  "auditor": zod.string().optional(),
  "auditDate": zod.coerce.date().optional(),
  "status": zod.string().optional()
})

export const UpdateAuditResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "auditor": zod.string(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "auditDate": zod.coerce.date(),
  "status": zod.enum(['scheduled', 'in_progress', 'completed', 'cancelled']),
  "issueCount": zod.number().optional()
})


export const ListComplianceIssuesQueryParams = zod.object({
  "auditId": zod.coerce.number().optional(),
  "status": zod.coerce.string().optional(),
  "overdue": zod.coerce.boolean().optional()
})

export const ListComplianceIssuesResponseItem = zod.object({
  "id": zod.number(),
  "auditId": zod.number(),
  "auditTitle": zod.string().nullish(),
  "severity": zod.enum(['low', 'medium', 'high', 'critical']),
  "description": zod.string(),
  "ownerId": zod.number(),
  "ownerName": zod.string().nullish(),
  "dueDate": zod.coerce.date(),
  "status": zod.enum(['open', 'in_progress', 'resolved', 'overdue']),
  "isOverdue": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
})
export const ListComplianceIssuesResponse = zod.array(ListComplianceIssuesResponseItem)


export const createComplianceIssueBodyStatusDefault = `open`;

export const CreateComplianceIssueBody = zod.object({
  "auditId": zod.number(),
  "severity": zod.enum(['low', 'medium', 'high', 'critical']),
  "description": zod.string(),
  "ownerId": zod.number(),
  "dueDate": zod.coerce.date(),
  "status": zod.enum(['open', 'in_progress', 'resolved', 'overdue']).default(createComplianceIssueBodyStatusDefault)
})

export const CreateComplianceIssueResponse = zod.object({
  "id": zod.number(),
  "auditId": zod.number(),
  "auditTitle": zod.string().nullish(),
  "severity": zod.enum(['low', 'medium', 'high', 'critical']),
  "description": zod.string(),
  "ownerId": zod.number(),
  "ownerName": zod.string().nullish(),
  "dueDate": zod.coerce.date(),
  "status": zod.enum(['open', 'in_progress', 'resolved', 'overdue']),
  "isOverdue": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
})


export const GetComplianceIssueParams = zod.object({
  "id": zod.coerce.number()
})

export const GetComplianceIssueResponse = zod.object({
  "id": zod.number(),
  "auditId": zod.number(),
  "auditTitle": zod.string().nullish(),
  "severity": zod.enum(['low', 'medium', 'high', 'critical']),
  "description": zod.string(),
  "ownerId": zod.number(),
  "ownerName": zod.string().nullish(),
  "dueDate": zod.coerce.date(),
  "status": zod.enum(['open', 'in_progress', 'resolved', 'overdue']),
  "isOverdue": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
})


export const UpdateComplianceIssueParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateComplianceIssueBody = zod.object({
  "severity": zod.string().optional(),
  "description": zod.string().optional(),
  "ownerId": zod.number().optional(),
  "dueDate": zod.coerce.date().optional(),
  "status": zod.string().optional()
})

export const UpdateComplianceIssueResponse = zod.object({
  "id": zod.number(),
  "auditId": zod.number(),
  "auditTitle": zod.string().nullish(),
  "severity": zod.enum(['low', 'medium', 'high', 'critical']),
  "description": zod.string(),
  "ownerId": zod.number(),
  "ownerName": zod.string().nullish(),
  "dueDate": zod.coerce.date(),
  "status": zod.enum(['open', 'in_progress', 'resolved', 'overdue']),
  "isOverdue": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
})


export const ListChallengesQueryParams = zod.object({
  "status": zod.coerce.string().optional(),
  "categoryId": zod.coerce.number().optional()
})

export const ListChallengesResponseItem = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "xp": zod.number(),
  "difficulty": zod.enum(['easy', 'medium', 'hard']),
  "evidenceRequired": zod.boolean().optional(),
  "deadline": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'under_review', 'completed', 'archived']),
  "participantCount": zod.number().optional(),
  "createdAt": zod.coerce.date().optional()
})
export const ListChallengesResponse = zod.array(ListChallengesResponseItem)


export const createChallengeBodyEvidenceRequiredDefault = false;
export const createChallengeBodyStatusDefault = `draft`;

export const CreateChallengeBody = zod.object({
  "title": zod.string(),
  "description": zod.string().optional(),
  "categoryId": zod.number(),
  "xp": zod.number(),
  "difficulty": zod.enum(['easy', 'medium', 'hard']),
  "evidenceRequired": zod.boolean().default(createChallengeBodyEvidenceRequiredDefault),
  "deadline": zod.coerce.date().optional(),
  "status": zod.enum(['draft', 'active', 'under_review', 'completed', 'archived']).default(createChallengeBodyStatusDefault)
})

export const CreateChallengeResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "xp": zod.number(),
  "difficulty": zod.enum(['easy', 'medium', 'hard']),
  "evidenceRequired": zod.boolean().optional(),
  "deadline": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'under_review', 'completed', 'archived']),
  "participantCount": zod.number().optional(),
  "createdAt": zod.coerce.date().optional()
})


export const GetChallengeParams = zod.object({
  "id": zod.coerce.number()
})

export const GetChallengeResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "xp": zod.number(),
  "difficulty": zod.enum(['easy', 'medium', 'hard']),
  "evidenceRequired": zod.boolean().optional(),
  "deadline": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'under_review', 'completed', 'archived']),
  "participantCount": zod.number().optional(),
  "createdAt": zod.coerce.date().optional()
})


export const UpdateChallengeParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateChallengeBody = zod.object({
  "title": zod.string().optional(),
  "description": zod.string().optional(),
  "categoryId": zod.number().optional(),
  "xp": zod.number().optional(),
  "difficulty": zod.string().optional(),
  "evidenceRequired": zod.boolean().optional(),
  "deadline": zod.coerce.date().optional(),
  "status": zod.string().optional()
})

export const UpdateChallengeResponse = zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "categoryId": zod.number(),
  "categoryName": zod.string().nullish(),
  "xp": zod.number(),
  "difficulty": zod.enum(['easy', 'medium', 'hard']),
  "evidenceRequired": zod.boolean().optional(),
  "deadline": zod.string().nullish(),
  "status": zod.enum(['draft', 'active', 'under_review', 'completed', 'archived']),
  "participantCount": zod.number().optional(),
  "createdAt": zod.coerce.date().optional()
})


export const DeleteChallengeParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteChallengeResponse = zod.void()


export const ListChallengeParticipationsQueryParams = zod.object({
  "challengeId": zod.coerce.number().optional(),
  "employeeId": zod.coerce.number().optional()
})

export const ListChallengeParticipationsResponseItem = zod.object({
  "id": zod.number(),
  "challengeId": zod.number(),
  "challengeTitle": zod.string().nullish(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "progress": zod.number().optional(),
  "proof": zod.string().nullish(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']),
  "xpAwarded": zod.number().optional(),
  "submittedAt": zod.coerce.date().optional()
})
export const ListChallengeParticipationsResponse = zod.array(ListChallengeParticipationsResponseItem)


export const createChallengeParticipationBodyProgressDefault = 0;

export const CreateChallengeParticipationBody = zod.object({
  "challengeId": zod.number(),
  "employeeId": zod.number(),
  "progress": zod.number().default(createChallengeParticipationBodyProgressDefault),
  "proof": zod.string().optional()
})

export const CreateChallengeParticipationResponse = zod.object({
  "id": zod.number(),
  "challengeId": zod.number(),
  "challengeTitle": zod.string().nullish(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "progress": zod.number().optional(),
  "proof": zod.string().nullish(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']),
  "xpAwarded": zod.number().optional(),
  "submittedAt": zod.coerce.date().optional()
})


export const UpdateChallengeParticipationParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateChallengeParticipationBody = zod.object({
  "progress": zod.number().optional(),
  "proof": zod.string().optional(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']).optional(),
  "xpAwarded": zod.number().optional()
})

export const UpdateChallengeParticipationResponse = zod.object({
  "id": zod.number(),
  "challengeId": zod.number(),
  "challengeTitle": zod.string().nullish(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "progress": zod.number().optional(),
  "proof": zod.string().nullish(),
  "approvalStatus": zod.enum(['pending', 'approved', 'rejected']),
  "xpAwarded": zod.number().optional(),
  "submittedAt": zod.coerce.date().optional()
})


export const ListBadgesResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "description": zod.string(),
  "unlockRule": zod.string(),
  "unlockType": zod.enum(['xp_threshold', 'challenge_count', 'participation_count']).optional(),
  "unlockValue": zod.number().optional(),
  "icon": zod.string(),
  "isActive": zod.boolean().optional()
})
export const ListBadgesResponse = zod.array(ListBadgesResponseItem)


export const createBadgeBodyIsActiveDefault = true;

export const CreateBadgeBody = zod.object({
  "name": zod.string(),
  "description": zod.string(),
  "unlockRule": zod.string(),
  "unlockType": zod.enum(['xp_threshold', 'challenge_count', 'participation_count']),
  "unlockValue": zod.number(),
  "icon": zod.string(),
  "isActive": zod.boolean().default(createBadgeBodyIsActiveDefault)
})

export const CreateBadgeResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "description": zod.string(),
  "unlockRule": zod.string(),
  "unlockType": zod.enum(['xp_threshold', 'challenge_count', 'participation_count']).optional(),
  "unlockValue": zod.number().optional(),
  "icon": zod.string(),
  "isActive": zod.boolean().optional()
})


export const UpdateBadgeParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateBadgeBody = zod.object({
  "name": zod.string().optional(),
  "description": zod.string().optional(),
  "unlockRule": zod.string().optional(),
  "unlockType": zod.string().optional(),
  "unlockValue": zod.number().optional(),
  "icon": zod.string().optional(),
  "isActive": zod.boolean().optional()
})

export const UpdateBadgeResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "description": zod.string(),
  "unlockRule": zod.string(),
  "unlockType": zod.enum(['xp_threshold', 'challenge_count', 'participation_count']).optional(),
  "unlockValue": zod.number().optional(),
  "icon": zod.string(),
  "isActive": zod.boolean().optional()
})


export const DeleteBadgeParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteBadgeResponse = zod.void()


export const ListEmployeeBadgesQueryParams = zod.object({
  "employeeId": zod.coerce.number().optional()
})

export const ListEmployeeBadgesResponseItem = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "badgeId": zod.number(),
  "badgeName": zod.string().nullish(),
  "badgeIcon": zod.string().nullish(),
  "awardedAt": zod.coerce.date()
})
export const ListEmployeeBadgesResponse = zod.array(ListEmployeeBadgesResponseItem)


export const AwardBadgeBody = zod.object({
  "employeeId": zod.number(),
  "badgeId": zod.number()
})

export const AwardBadgeResponse = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "badgeId": zod.number(),
  "badgeName": zod.string().nullish(),
  "badgeIcon": zod.string().nullish(),
  "awardedAt": zod.coerce.date()
})


export const ListRewardsResponseItem = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "description": zod.string(),
  "pointsRequired": zod.number(),
  "stock": zod.number(),
  "status": zod.enum(['active', 'inactive']),
  "redemptionCount": zod.number().optional()
})
export const ListRewardsResponse = zod.array(ListRewardsResponseItem)


export const createRewardBodyStatusDefault = `active`;

export const CreateRewardBody = zod.object({
  "name": zod.string(),
  "description": zod.string(),
  "pointsRequired": zod.number(),
  "stock": zod.number(),
  "status": zod.enum(['active', 'inactive']).default(createRewardBodyStatusDefault)
})

export const CreateRewardResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "description": zod.string(),
  "pointsRequired": zod.number(),
  "stock": zod.number(),
  "status": zod.enum(['active', 'inactive']),
  "redemptionCount": zod.number().optional()
})


export const UpdateRewardParams = zod.object({
  "id": zod.coerce.number()
})

export const UpdateRewardBody = zod.object({
  "name": zod.string().optional(),
  "description": zod.string().optional(),
  "pointsRequired": zod.number().optional(),
  "stock": zod.number().optional(),
  "status": zod.string().optional()
})

export const UpdateRewardResponse = zod.object({
  "id": zod.number(),
  "name": zod.string(),
  "description": zod.string(),
  "pointsRequired": zod.number(),
  "stock": zod.number(),
  "status": zod.enum(['active', 'inactive']),
  "redemptionCount": zod.number().optional()
})


export const DeleteRewardParams = zod.object({
  "id": zod.coerce.number()
})

export const DeleteRewardResponse = zod.void()


export const ListRewardRedemptionsQueryParams = zod.object({
  "employeeId": zod.coerce.number().optional()
})

export const ListRewardRedemptionsResponseItem = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "rewardId": zod.number(),
  "rewardName": zod.string().nullish(),
  "pointsSpent": zod.number(),
  "redeemedAt": zod.coerce.date()
})
export const ListRewardRedemptionsResponse = zod.array(ListRewardRedemptionsResponseItem)


export const RedeemRewardBody = zod.object({
  "employeeId": zod.number(),
  "rewardId": zod.number()
})

export const RedeemRewardResponse = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string().nullish(),
  "rewardId": zod.number(),
  "rewardName": zod.string().nullish(),
  "pointsSpent": zod.number(),
  "redeemedAt": zod.coerce.date()
})


export const GetLeaderboardQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "limit": zod.coerce.number().optional()
})

export const GetLeaderboardResponseItem = zod.object({
  "rank": zod.number(),
  "employeeId": zod.number(),
  "employeeName": zod.string(),
  "departmentName": zod.string().nullish(),
  "xp": zod.number(),
  "totalPoints": zod.number().optional(),
  "badgeCount": zod.number(),
  "challengeCount": zod.number()
})
export const GetLeaderboardResponse = zod.array(GetLeaderboardResponseItem)


export const ListNotificationsQueryParams = zod.object({
  "employeeId": zod.coerce.number().optional(),
  "unread": zod.coerce.boolean().optional()
})

export const ListNotificationsResponseItem = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "type": zod.enum(['compliance_issue', 'csr_approval', 'challenge_approval', 'policy_reminder', 'badge_unlock', 'reward_redemption']),
  "title": zod.string(),
  "message": zod.string(),
  "isRead": zod.boolean(),
  "createdAt": zod.coerce.date()
})
export const ListNotificationsResponse = zod.array(ListNotificationsResponseItem)


export const MarkNotificationReadParams = zod.object({
  "id": zod.coerce.number()
})

export const MarkNotificationReadResponse = zod.object({
  "id": zod.number(),
  "employeeId": zod.number(),
  "type": zod.enum(['compliance_issue', 'csr_approval', 'challenge_approval', 'policy_reminder', 'badge_unlock', 'reward_redemption']),
  "title": zod.string(),
  "message": zod.string(),
  "isRead": zod.boolean(),
  "createdAt": zod.coerce.date()
})


export const GetSettingsResponse = zod.object({
  "id": zod.number(),
  "autoEmissionCalculation": zod.boolean().optional(),
  "evidenceRequired": zod.boolean().optional(),
  "badgeAutoAward": zod.boolean().optional(),
  "environmentalWeight": zod.number().optional(),
  "socialWeight": zod.number().optional(),
  "governanceWeight": zod.number().optional(),
  "notifyComplianceIssue": zod.boolean().optional(),
  "notifyCsrApproval": zod.boolean().optional(),
  "notifyChallengeApproval": zod.boolean().optional(),
  "notifyPolicyReminder": zod.boolean().optional(),
  "notifyBadgeUnlock": zod.boolean().optional(),
  "updatedAt": zod.coerce.date().optional()
})


export const UpdateSettingsBody = zod.object({
  "autoEmissionCalculation": zod.boolean().optional(),
  "evidenceRequired": zod.boolean().optional(),
  "badgeAutoAward": zod.boolean().optional(),
  "environmentalWeight": zod.number().optional(),
  "socialWeight": zod.number().optional(),
  "governanceWeight": zod.number().optional(),
  "notifyComplianceIssue": zod.boolean().optional(),
  "notifyCsrApproval": zod.boolean().optional(),
  "notifyChallengeApproval": zod.boolean().optional(),
  "notifyPolicyReminder": zod.boolean().optional(),
  "notifyBadgeUnlock": zod.boolean().optional()
})

export const UpdateSettingsResponse = zod.object({
  "id": zod.number(),
  "autoEmissionCalculation": zod.boolean().optional(),
  "evidenceRequired": zod.boolean().optional(),
  "badgeAutoAward": zod.boolean().optional(),
  "environmentalWeight": zod.number().optional(),
  "socialWeight": zod.number().optional(),
  "governanceWeight": zod.number().optional(),
  "notifyComplianceIssue": zod.boolean().optional(),
  "notifyCsrApproval": zod.boolean().optional(),
  "notifyChallengeApproval": zod.boolean().optional(),
  "notifyPolicyReminder": zod.boolean().optional(),
  "notifyBadgeUnlock": zod.boolean().optional(),
  "updatedAt": zod.coerce.date().optional()
})


export const GetDashboardSummaryResponse = zod.object({
  "overallEsgScore": zod.number(),
  "environmentalScore": zod.number(),
  "socialScore": zod.number(),
  "governanceScore": zod.number(),
  "totalCarbonEmissions": zod.number().optional(),
  "activeChallenges": zod.number().optional(),
  "totalEmployees": zod.number().optional(),
  "activeParticipations": zod.number().optional(),
  "openComplianceIssues": zod.number().optional(),
  "overdueComplianceIssues": zod.number().optional(),
  "recentActivity": zod.array(zod.object({
  "id": zod.number(),
  "type": zod.string(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "createdAt": zod.coerce.date()
})).optional()
})


export const GetEnvironmentalDashboardQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "startDate": zod.date().optional(),
  "endDate": zod.date().optional()
})

export const GetEnvironmentalDashboardResponse = zod.object({
  "totalEmissions": zod.number().optional(),
  "emissionsByDepartment": zod.array(zod.object({
  "departmentId": zod.number(),
  "departmentName": zod.string(),
  "totalEmission": zod.number()
})).optional(),
  "emissionsBySource": zod.array(zod.object({
  "source": zod.string(),
  "totalEmission": zod.number()
})).optional(),
  "emissionsTrend": zod.array(zod.object({
  "period": zod.string(),
  "value": zod.number()
})).optional(),
  "goalsProgress": zod.array(zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "targetValue": zod.number(),
  "currentValue": zod.number(),
  "unit": zod.string(),
  "deadline": zod.coerce.date(),
  "status": zod.enum(['active', 'achieved', 'missed', 'cancelled']),
  "progressPercent": zod.number().optional()
})).optional(),
  "goalsAchieved": zod.number().optional(),
  "goalsTotal": zod.number().optional()
})


export const GetSocialDashboardResponse = zod.object({
  "totalParticipations": zod.number().optional(),
  "approvedParticipations": zod.number().optional(),
  "pendingParticipations": zod.number().optional(),
  "activeCsrActivities": zod.number().optional(),
  "participationsByDepartment": zod.array(zod.object({
  "departmentName": zod.string(),
  "count": zod.number()
})).optional(),
  "genderDistribution": zod.array(zod.object({
  "gender": zod.string(),
  "count": zod.number(),
  "percent": zod.number()
})).optional(),
  "topParticipants": zod.array(zod.object({
  "employeeId": zod.number(),
  "employeeName": zod.string(),
  "participationCount": zod.number(),
  "pointsEarned": zod.number()
})).optional()
})


export const GetGovernanceDashboardResponse = zod.object({
  "activePolicies": zod.number().optional(),
  "totalAcknowledgements": zod.number().optional(),
  "acknowledgementRate": zod.number().optional(),
  "totalAudits": zod.number().optional(),
  "completedAudits": zod.number().optional(),
  "openComplianceIssues": zod.number().optional(),
  "overdueComplianceIssues": zod.number().optional(),
  "issuesBySeverity": zod.array(zod.object({
  "severity": zod.string(),
  "count": zod.number()
})).optional(),
  "recentAudits": zod.array(zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "auditor": zod.string(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "auditDate": zod.coerce.date(),
  "status": zod.enum(['scheduled', 'in_progress', 'completed', 'cancelled']),
  "issueCount": zod.number().optional()
})).optional()
})


export const GetDepartmentRankingsResponseItem = zod.object({
  "rank": zod.number(),
  "departmentId": zod.number(),
  "departmentName": zod.string(),
  "environmentalScore": zod.number().optional(),
  "socialScore": zod.number().optional(),
  "governanceScore": zod.number().optional(),
  "totalScore": zod.number()
})
export const GetDepartmentRankingsResponse = zod.array(GetDepartmentRankingsResponseItem)


export const GetEnvironmentalReportQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "startDate": zod.date().optional(),
  "endDate": zod.date().optional()
})

export const GetEnvironmentalReportResponse = zod.object({
  "generatedAt": zod.coerce.date().optional(),
  "period": zod.object({
  "startDate": zod.coerce.date(),
  "endDate": zod.coerce.date()
}).optional(),
  "totalEmissions": zod.number().optional(),
  "emissionsByDepartment": zod.array(zod.object({
  "departmentId": zod.number(),
  "departmentName": zod.string(),
  "totalEmission": zod.number()
})).optional(),
  "emissionsBySource": zod.array(zod.object({
  "source": zod.string(),
  "totalEmission": zod.number()
})).optional(),
  "goalsStatus": zod.array(zod.object({
  "id": zod.number(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "departmentId": zod.number().nullish(),
  "departmentName": zod.string().nullish(),
  "targetValue": zod.number(),
  "currentValue": zod.number(),
  "unit": zod.string(),
  "deadline": zod.coerce.date(),
  "status": zod.enum(['active', 'achieved', 'missed', 'cancelled']),
  "progressPercent": zod.number().optional()
})).optional(),
  "transactions": zod.array(zod.object({
  "id": zod.number(),
  "departmentId": zod.number(),
  "departmentName": zod.string().nullish(),
  "emissionFactorId": zod.number(),
  "emissionFactorName": zod.string().nullish(),
  "quantity": zod.number(),
  "totalEmission": zod.number(),
  "source": zod.enum(['purchase', 'manufacturing', 'expense', 'fleet', 'manual']),
  "description": zod.string().nullish(),
  "transactionDate": zod.coerce.date(),
  "createdAt": zod.coerce.date().optional()
})).optional()
})


export const GetSocialReportQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "startDate": zod.date().optional(),
  "endDate": zod.date().optional(),
  "employeeId": zod.coerce.number().optional()
})

export const GetSocialReportResponse = zod.object({
  "generatedAt": zod.coerce.date().optional(),
  "period": zod.object({
  "startDate": zod.coerce.date(),
  "endDate": zod.coerce.date()
}).optional(),
  "totalParticipations": zod.number().optional(),
  "approvalRate": zod.number().optional(),
  "activitiesByCategory": zod.array(zod.object({
  "categoryName": zod.string(),
  "count": zod.number()
})).optional(),
  "genderDistribution": zod.array(zod.object({
  "gender": zod.string(),
  "count": zod.number(),
  "percent": zod.number()
})).optional(),
  "topParticipants": zod.array(zod.object({
  "employeeId": zod.number(),
  "employeeName": zod.string(),
  "participationCount": zod.number(),
  "pointsEarned": zod.number()
})).optional()
})


export const GetGovernanceReportQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "startDate": zod.date().optional(),
  "endDate": zod.date().optional()
})

export const GetGovernanceReportResponse = zod.object({
  "generatedAt": zod.coerce.date().optional(),
  "period": zod.object({
  "startDate": zod.coerce.date(),
  "endDate": zod.coerce.date()
}).optional(),
  "activePolicies": zod.number().optional(),
  "acknowledgementRate": zod.number().optional(),
  "auditsCompleted": zod.number().optional(),
  "complianceIssuesRaised": zod.number().optional(),
  "complianceIssuesResolved": zod.number().optional(),
  "issuesBySeverity": zod.array(zod.object({
  "severity": zod.string(),
  "count": zod.number()
})).optional()
})


export const GetEsgSummaryReportQueryParams = zod.object({
  "departmentId": zod.coerce.number().optional(),
  "startDate": zod.date().optional(),
  "endDate": zod.date().optional()
})

export const GetEsgSummaryReportResponse = zod.object({
  "generatedAt": zod.coerce.date().optional(),
  "period": zod.object({
  "startDate": zod.coerce.date(),
  "endDate": zod.coerce.date()
}).optional(),
  "overallScore": zod.number().optional(),
  "environmentalScore": zod.number().optional(),
  "socialScore": zod.number().optional(),
  "governanceScore": zod.number().optional(),
  "departmentRankings": zod.array(zod.object({
  "rank": zod.number(),
  "departmentId": zod.number(),
  "departmentName": zod.string(),
  "environmentalScore": zod.number().optional(),
  "socialScore": zod.number().optional(),
  "governanceScore": zod.number().optional(),
  "totalScore": zod.number()
})).optional(),
  "highlights": zod.array(zod.string()).optional()
})


