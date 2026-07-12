import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  Audit,
  AuditInput,
  AuditUpdate,
  Badge,
  BadgeInput,
  BadgeUpdate,
  CarbonTransaction,
  CarbonTransactionInput,
  Category,
  CategoryInput,
  CategoryUpdate,
  Challenge,
  ChallengeInput,
  ChallengeParticipation,
  ChallengeParticipationInput,
  ChallengeParticipationUpdate,
  ChallengeUpdate,
  ComplianceIssue,
  ComplianceIssueInput,
  ComplianceIssueUpdate,
  CsrActivity,
  CsrActivityInput,
  CsrActivityUpdate,
  DashboardSummary,
  Department,
  DepartmentInput,
  DepartmentRanking,
  DepartmentScore,
  DepartmentUpdate,
  EmissionFactor,
  EmissionFactorInput,
  EmissionFactorUpdate,
  Employee,
  EmployeeBadge,
  EmployeeBadgeInput,
  EmployeeInput,
  EmployeeParticipation,
  EmployeeParticipationInput,
  EmployeeParticipationUpdate,
  EmployeeUpdate,
  EnvironmentalDashboard,
  EnvironmentalGoal,
  EnvironmentalGoalInput,
  EnvironmentalGoalUpdate,
  EnvironmentalReport,
  EsgPolicy,
  EsgPolicyInput,
  EsgPolicyUpdate,
  EsgSummaryReport,
  GetEnvironmentalDashboardParams,
  GetEnvironmentalReportParams,
  GetEsgSummaryReportParams,
  GetGovernanceReportParams,
  GetLeaderboardParams,
  GetSocialReportParams,
  GovernanceDashboard,
  GovernanceReport,
  HealthStatus,
  LeaderboardEntry,
  ListCarbonTransactionsParams,
  ListCategoriesParams,
  ListChallengeParticipationsParams,
  ListChallengesParams,
  ListComplianceIssuesParams,
  ListEmployeeBadgesParams,
  ListEmployeeParticipationsParams,
  ListNotificationsParams,
  ListPolicyAcknowledgementsParams,
  ListRewardRedemptionsParams,
  Notification,
  PlatformSettings,
  PlatformSettingsUpdate,
  PolicyAcknowledgement,
  PolicyAcknowledgementInput,
  Reward,
  RewardInput,
  RewardRedemption,
  RewardRedemptionInput,
  RewardUpdate,
  SocialDashboard,
  SocialReport
} from './api.schemas';

import { customFetch } from '../custom-fetch';
import type { ErrorType , BodyType } from '../custom-fetch';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



const withQueryKey = <T extends object, K>(query: T, queryKey: K): T & { queryKey: K } => {
  const result = { queryKey } as T & { queryKey: K };
  for (const key of Object.keys(query)) {
    
    
    if (key === 'queryKey') continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: () => (query as Record<string, unknown>)[key],
    });
  }
  return result;
};

export const getHealthCheckUrl = () => {




  return `/api/healthz`
}

export const healthCheck = async ( options?: RequestInit): Promise<HealthStatus> => {

  return customFetch<HealthStatus>(getHealthCheckUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getHealthCheckQueryKey = () => {
    return [
    `/api/healthz`
    ] as const;
    }


export const getHealthCheckQueryOptions = <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getHealthCheckQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCheck>>> = ({ signal }) => healthCheck({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & { queryKey: QueryKey }
}

export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>
export type HealthCheckQueryError = ErrorType<unknown>



export function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getHealthCheckQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListDepartmentsUrl = () => {




  return `/api/departments`
}

export const listDepartments = async ( options?: RequestInit): Promise<Department[]> => {

  return customFetch<Department[]>(getListDepartmentsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListDepartmentsQueryKey = () => {
    return [
    `/api/departments`
    ] as const;
    }


export const getListDepartmentsQueryOptions = <TData = Awaited<ReturnType<typeof listDepartments>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listDepartments>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListDepartmentsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listDepartments>>> = ({ signal }) => listDepartments({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listDepartments>>, TError, TData> & { queryKey: QueryKey }
}

export type ListDepartmentsQueryResult = NonNullable<Awaited<ReturnType<typeof listDepartments>>>
export type ListDepartmentsQueryError = ErrorType<unknown>



export function useListDepartments<TData = Awaited<ReturnType<typeof listDepartments>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listDepartments>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListDepartmentsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateDepartmentUrl = () => {




  return `/api/departments`
}

export const createDepartment = async (departmentInput: DepartmentInput, options?: RequestInit): Promise<Department> => {

  return customFetch<Department>(getCreateDepartmentUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(departmentInput)
  }
);}





export const getCreateDepartmentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createDepartment>>, TError,{data: BodyType<DepartmentInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createDepartment>>, TError,{data: BodyType<DepartmentInput>}, TContext> => {

const mutationKey = ['createDepartment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createDepartment>>, {data: BodyType<DepartmentInput>}> = (props) => {
          const {data} = props ?? {};

          return  createDepartment(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateDepartmentMutationResult = NonNullable<Awaited<ReturnType<typeof createDepartment>>>
    export type CreateDepartmentMutationBody = BodyType<DepartmentInput>
    export type CreateDepartmentMutationError = ErrorType<unknown>

    export const useCreateDepartment = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createDepartment>>, TError,{data: BodyType<DepartmentInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createDepartment>>,
        TError,
        {data: BodyType<DepartmentInput>},
        TContext
      > => {
      return useMutation(getCreateDepartmentMutationOptions(options));
    }

export const getGetDepartmentUrl = (id: number,) => {




  return `/api/departments/${id}`
}

export const getDepartment = async (id: number, options?: RequestInit): Promise<Department> => {

  return customFetch<Department>(getGetDepartmentUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetDepartmentQueryKey = (id: number,) => {
    return [
    `/api/departments/${id}`
    ] as const;
    }


export const getGetDepartmentQueryOptions = <TData = Awaited<ReturnType<typeof getDepartment>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDepartment>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDepartmentQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDepartment>>> = ({ signal }) => getDepartment(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getDepartment>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDepartmentQueryResult = NonNullable<Awaited<ReturnType<typeof getDepartment>>>
export type GetDepartmentQueryError = ErrorType<unknown>



export function useGetDepartment<TData = Awaited<ReturnType<typeof getDepartment>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDepartment>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetDepartmentQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateDepartmentUrl = (id: number,) => {




  return `/api/departments/${id}`
}

export const updateDepartment = async (id: number,
    departmentUpdate: DepartmentUpdate, options?: RequestInit): Promise<Department> => {

  return customFetch<Department>(getUpdateDepartmentUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(departmentUpdate)
  }
);}





export const getUpdateDepartmentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateDepartment>>, TError,{id: number;data: BodyType<DepartmentUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateDepartment>>, TError,{id: number;data: BodyType<DepartmentUpdate>}, TContext> => {

const mutationKey = ['updateDepartment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateDepartment>>, {id: number;data: BodyType<DepartmentUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateDepartment(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateDepartmentMutationResult = NonNullable<Awaited<ReturnType<typeof updateDepartment>>>
    export type UpdateDepartmentMutationBody = BodyType<DepartmentUpdate>
    export type UpdateDepartmentMutationError = ErrorType<unknown>

    export const useUpdateDepartment = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateDepartment>>, TError,{id: number;data: BodyType<DepartmentUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateDepartment>>,
        TError,
        {id: number;data: BodyType<DepartmentUpdate>},
        TContext
      > => {
      return useMutation(getUpdateDepartmentMutationOptions(options));
    }

export const getDeleteDepartmentUrl = (id: number,) => {




  return `/api/departments/${id}`
}

export const deleteDepartment = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteDepartmentUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteDepartmentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteDepartment>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteDepartment>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteDepartment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteDepartment>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteDepartment(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteDepartmentMutationResult = NonNullable<Awaited<ReturnType<typeof deleteDepartment>>>

    export type DeleteDepartmentMutationError = ErrorType<unknown>

    export const useDeleteDepartment = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteDepartment>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteDepartment>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteDepartmentMutationOptions(options));
    }

export const getGetDepartmentScoreUrl = (id: number,) => {




  return `/api/departments/${id}/score`
}

export const getDepartmentScore = async (id: number, options?: RequestInit): Promise<DepartmentScore> => {

  return customFetch<DepartmentScore>(getGetDepartmentScoreUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetDepartmentScoreQueryKey = (id: number,) => {
    return [
    `/api/departments/${id}/score`
    ] as const;
    }


export const getGetDepartmentScoreQueryOptions = <TData = Awaited<ReturnType<typeof getDepartmentScore>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDepartmentScore>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDepartmentScoreQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDepartmentScore>>> = ({ signal }) => getDepartmentScore(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getDepartmentScore>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDepartmentScoreQueryResult = NonNullable<Awaited<ReturnType<typeof getDepartmentScore>>>
export type GetDepartmentScoreQueryError = ErrorType<unknown>



export function useGetDepartmentScore<TData = Awaited<ReturnType<typeof getDepartmentScore>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDepartmentScore>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetDepartmentScoreQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListCategoriesUrl = (params?: ListCategoriesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/categories?${stringifiedParams}` : `/api/categories`
}

export const listCategories = async (params?: ListCategoriesParams, options?: RequestInit): Promise<Category[]> => {

  return customFetch<Category[]>(getListCategoriesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListCategoriesQueryKey = (params?: ListCategoriesParams,) => {
    return [
    `/api/categories`, ...(params ? [params] : [])
    ] as const;
    }


export const getListCategoriesQueryOptions = <TData = Awaited<ReturnType<typeof listCategories>>, TError = ErrorType<unknown>>(params?: ListCategoriesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListCategoriesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listCategories>>> = ({ signal }) => listCategories(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData> & { queryKey: QueryKey }
}

export type ListCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof listCategories>>>
export type ListCategoriesQueryError = ErrorType<unknown>



export function useListCategories<TData = Awaited<ReturnType<typeof listCategories>>, TError = ErrorType<unknown>>(
 params?: ListCategoriesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listCategories>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListCategoriesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateCategoryUrl = () => {




  return `/api/categories`
}

export const createCategory = async (categoryInput: CategoryInput, options?: RequestInit): Promise<Category> => {

  return customFetch<Category>(getCreateCategoryUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(categoryInput)
  }
);}





export const getCreateCategoryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createCategory>>, TError,{data: BodyType<CategoryInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createCategory>>, TError,{data: BodyType<CategoryInput>}, TContext> => {

const mutationKey = ['createCategory'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createCategory>>, {data: BodyType<CategoryInput>}> = (props) => {
          const {data} = props ?? {};

          return  createCategory(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateCategoryMutationResult = NonNullable<Awaited<ReturnType<typeof createCategory>>>
    export type CreateCategoryMutationBody = BodyType<CategoryInput>
    export type CreateCategoryMutationError = ErrorType<unknown>

    export const useCreateCategory = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createCategory>>, TError,{data: BodyType<CategoryInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createCategory>>,
        TError,
        {data: BodyType<CategoryInput>},
        TContext
      > => {
      return useMutation(getCreateCategoryMutationOptions(options));
    }

export const getUpdateCategoryUrl = (id: number,) => {




  return `/api/categories/${id}`
}

export const updateCategory = async (id: number,
    categoryUpdate: CategoryUpdate, options?: RequestInit): Promise<Category> => {

  return customFetch<Category>(getUpdateCategoryUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(categoryUpdate)
  }
);}





export const getUpdateCategoryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateCategory>>, TError,{id: number;data: BodyType<CategoryUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateCategory>>, TError,{id: number;data: BodyType<CategoryUpdate>}, TContext> => {

const mutationKey = ['updateCategory'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateCategory>>, {id: number;data: BodyType<CategoryUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateCategory(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateCategoryMutationResult = NonNullable<Awaited<ReturnType<typeof updateCategory>>>
    export type UpdateCategoryMutationBody = BodyType<CategoryUpdate>
    export type UpdateCategoryMutationError = ErrorType<unknown>

    export const useUpdateCategory = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateCategory>>, TError,{id: number;data: BodyType<CategoryUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateCategory>>,
        TError,
        {id: number;data: BodyType<CategoryUpdate>},
        TContext
      > => {
      return useMutation(getUpdateCategoryMutationOptions(options));
    }

export const getDeleteCategoryUrl = (id: number,) => {




  return `/api/categories/${id}`
}

export const deleteCategory = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteCategoryUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteCategoryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteCategory>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteCategory>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteCategory'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteCategory>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteCategory(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteCategoryMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCategory>>>

    export type DeleteCategoryMutationError = ErrorType<unknown>

    export const useDeleteCategory = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteCategory>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteCategory>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteCategoryMutationOptions(options));
    }

export const getListEmployeesUrl = () => {




  return `/api/employees`
}

export const listEmployees = async ( options?: RequestInit): Promise<Employee[]> => {

  return customFetch<Employee[]>(getListEmployeesUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEmployeesQueryKey = () => {
    return [
    `/api/employees`
    ] as const;
    }


export const getListEmployeesQueryOptions = <TData = Awaited<ReturnType<typeof listEmployees>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEmployeesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEmployees>>> = ({ signal }) => listEmployees({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEmployeesQueryResult = NonNullable<Awaited<ReturnType<typeof listEmployees>>>
export type ListEmployeesQueryError = ErrorType<unknown>



export function useListEmployees<TData = Awaited<ReturnType<typeof listEmployees>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployees>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEmployeesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateEmployeeUrl = () => {




  return `/api/employees`
}

export const createEmployee = async (employeeInput: EmployeeInput, options?: RequestInit): Promise<Employee> => {

  return customFetch<Employee>(getCreateEmployeeUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeInput)
  }
);}





export const getCreateEmployeeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError,{data: BodyType<EmployeeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError,{data: BodyType<EmployeeInput>}, TContext> => {

const mutationKey = ['createEmployee'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createEmployee>>, {data: BodyType<EmployeeInput>}> = (props) => {
          const {data} = props ?? {};

          return  createEmployee(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof createEmployee>>>
    export type CreateEmployeeMutationBody = BodyType<EmployeeInput>
    export type CreateEmployeeMutationError = ErrorType<unknown>

    export const useCreateEmployee = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmployee>>, TError,{data: BodyType<EmployeeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createEmployee>>,
        TError,
        {data: BodyType<EmployeeInput>},
        TContext
      > => {
      return useMutation(getCreateEmployeeMutationOptions(options));
    }

export const getGetEmployeeUrl = (id: number,) => {




  return `/api/employees/${id}`
}

export const getEmployee = async (id: number, options?: RequestInit): Promise<Employee> => {

  return customFetch<Employee>(getGetEmployeeUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEmployeeQueryKey = (id: number,) => {
    return [
    `/api/employees/${id}`
    ] as const;
    }


export const getGetEmployeeQueryOptions = <TData = Awaited<ReturnType<typeof getEmployee>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEmployeeQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEmployee>>> = ({ signal }) => getEmployee(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEmployeeQueryResult = NonNullable<Awaited<ReturnType<typeof getEmployee>>>
export type GetEmployeeQueryError = ErrorType<unknown>



export function useGetEmployee<TData = Awaited<ReturnType<typeof getEmployee>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEmployee>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEmployeeQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateEmployeeUrl = (id: number,) => {




  return `/api/employees/${id}`
}

export const updateEmployee = async (id: number,
    employeeUpdate: EmployeeUpdate, options?: RequestInit): Promise<Employee> => {

  return customFetch<Employee>(getUpdateEmployeeUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeUpdate)
  }
);}





export const getUpdateEmployeeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError,{id: number;data: BodyType<EmployeeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError,{id: number;data: BodyType<EmployeeUpdate>}, TContext> => {

const mutationKey = ['updateEmployee'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateEmployee>>, {id: number;data: BodyType<EmployeeUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateEmployee(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof updateEmployee>>>
    export type UpdateEmployeeMutationBody = BodyType<EmployeeUpdate>
    export type UpdateEmployeeMutationError = ErrorType<unknown>

    export const useUpdateEmployee = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmployee>>, TError,{id: number;data: BodyType<EmployeeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateEmployee>>,
        TError,
        {id: number;data: BodyType<EmployeeUpdate>},
        TContext
      > => {
      return useMutation(getUpdateEmployeeMutationOptions(options));
    }

export const getListEmissionFactorsUrl = () => {




  return `/api/emission-factors`
}

export const listEmissionFactors = async ( options?: RequestInit): Promise<EmissionFactor[]> => {

  return customFetch<EmissionFactor[]>(getListEmissionFactorsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEmissionFactorsQueryKey = () => {
    return [
    `/api/emission-factors`
    ] as const;
    }


export const getListEmissionFactorsQueryOptions = <TData = Awaited<ReturnType<typeof listEmissionFactors>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmissionFactors>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEmissionFactorsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEmissionFactors>>> = ({ signal }) => listEmissionFactors({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEmissionFactors>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEmissionFactorsQueryResult = NonNullable<Awaited<ReturnType<typeof listEmissionFactors>>>
export type ListEmissionFactorsQueryError = ErrorType<unknown>



export function useListEmissionFactors<TData = Awaited<ReturnType<typeof listEmissionFactors>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmissionFactors>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEmissionFactorsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateEmissionFactorUrl = () => {




  return `/api/emission-factors`
}

export const createEmissionFactor = async (emissionFactorInput: EmissionFactorInput, options?: RequestInit): Promise<EmissionFactor> => {

  return customFetch<EmissionFactor>(getCreateEmissionFactorUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(emissionFactorInput)
  }
);}





export const getCreateEmissionFactorMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmissionFactor>>, TError,{data: BodyType<EmissionFactorInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createEmissionFactor>>, TError,{data: BodyType<EmissionFactorInput>}, TContext> => {

const mutationKey = ['createEmissionFactor'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createEmissionFactor>>, {data: BodyType<EmissionFactorInput>}> = (props) => {
          const {data} = props ?? {};

          return  createEmissionFactor(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateEmissionFactorMutationResult = NonNullable<Awaited<ReturnType<typeof createEmissionFactor>>>
    export type CreateEmissionFactorMutationBody = BodyType<EmissionFactorInput>
    export type CreateEmissionFactorMutationError = ErrorType<unknown>

    export const useCreateEmissionFactor = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmissionFactor>>, TError,{data: BodyType<EmissionFactorInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createEmissionFactor>>,
        TError,
        {data: BodyType<EmissionFactorInput>},
        TContext
      > => {
      return useMutation(getCreateEmissionFactorMutationOptions(options));
    }

export const getUpdateEmissionFactorUrl = (id: number,) => {




  return `/api/emission-factors/${id}`
}

export const updateEmissionFactor = async (id: number,
    emissionFactorUpdate: EmissionFactorUpdate, options?: RequestInit): Promise<EmissionFactor> => {

  return customFetch<EmissionFactor>(getUpdateEmissionFactorUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(emissionFactorUpdate)
  }
);}





export const getUpdateEmissionFactorMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmissionFactor>>, TError,{id: number;data: BodyType<EmissionFactorUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateEmissionFactor>>, TError,{id: number;data: BodyType<EmissionFactorUpdate>}, TContext> => {

const mutationKey = ['updateEmissionFactor'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateEmissionFactor>>, {id: number;data: BodyType<EmissionFactorUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateEmissionFactor(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateEmissionFactorMutationResult = NonNullable<Awaited<ReturnType<typeof updateEmissionFactor>>>
    export type UpdateEmissionFactorMutationBody = BodyType<EmissionFactorUpdate>
    export type UpdateEmissionFactorMutationError = ErrorType<unknown>

    export const useUpdateEmissionFactor = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmissionFactor>>, TError,{id: number;data: BodyType<EmissionFactorUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateEmissionFactor>>,
        TError,
        {id: number;data: BodyType<EmissionFactorUpdate>},
        TContext
      > => {
      return useMutation(getUpdateEmissionFactorMutationOptions(options));
    }

export const getDeleteEmissionFactorUrl = (id: number,) => {




  return `/api/emission-factors/${id}`
}

export const deleteEmissionFactor = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteEmissionFactorUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteEmissionFactorMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEmissionFactor>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteEmissionFactor>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteEmissionFactor'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteEmissionFactor>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteEmissionFactor(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteEmissionFactorMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEmissionFactor>>>

    export type DeleteEmissionFactorMutationError = ErrorType<unknown>

    export const useDeleteEmissionFactor = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEmissionFactor>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteEmissionFactor>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteEmissionFactorMutationOptions(options));
    }

export const getListCarbonTransactionsUrl = (params?: ListCarbonTransactionsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/carbon-transactions?${stringifiedParams}` : `/api/carbon-transactions`
}

export const listCarbonTransactions = async (params?: ListCarbonTransactionsParams, options?: RequestInit): Promise<CarbonTransaction[]> => {

  return customFetch<CarbonTransaction[]>(getListCarbonTransactionsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListCarbonTransactionsQueryKey = (params?: ListCarbonTransactionsParams,) => {
    return [
    `/api/carbon-transactions`, ...(params ? [params] : [])
    ] as const;
    }


export const getListCarbonTransactionsQueryOptions = <TData = Awaited<ReturnType<typeof listCarbonTransactions>>, TError = ErrorType<unknown>>(params?: ListCarbonTransactionsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listCarbonTransactions>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListCarbonTransactionsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listCarbonTransactions>>> = ({ signal }) => listCarbonTransactions(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listCarbonTransactions>>, TError, TData> & { queryKey: QueryKey }
}

export type ListCarbonTransactionsQueryResult = NonNullable<Awaited<ReturnType<typeof listCarbonTransactions>>>
export type ListCarbonTransactionsQueryError = ErrorType<unknown>



export function useListCarbonTransactions<TData = Awaited<ReturnType<typeof listCarbonTransactions>>, TError = ErrorType<unknown>>(
 params?: ListCarbonTransactionsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listCarbonTransactions>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListCarbonTransactionsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateCarbonTransactionUrl = () => {




  return `/api/carbon-transactions`
}

export const createCarbonTransaction = async (carbonTransactionInput: CarbonTransactionInput, options?: RequestInit): Promise<CarbonTransaction> => {

  return customFetch<CarbonTransaction>(getCreateCarbonTransactionUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(carbonTransactionInput)
  }
);}





export const getCreateCarbonTransactionMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createCarbonTransaction>>, TError,{data: BodyType<CarbonTransactionInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createCarbonTransaction>>, TError,{data: BodyType<CarbonTransactionInput>}, TContext> => {

const mutationKey = ['createCarbonTransaction'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createCarbonTransaction>>, {data: BodyType<CarbonTransactionInput>}> = (props) => {
          const {data} = props ?? {};

          return  createCarbonTransaction(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateCarbonTransactionMutationResult = NonNullable<Awaited<ReturnType<typeof createCarbonTransaction>>>
    export type CreateCarbonTransactionMutationBody = BodyType<CarbonTransactionInput>
    export type CreateCarbonTransactionMutationError = ErrorType<unknown>

    export const useCreateCarbonTransaction = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createCarbonTransaction>>, TError,{data: BodyType<CarbonTransactionInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createCarbonTransaction>>,
        TError,
        {data: BodyType<CarbonTransactionInput>},
        TContext
      > => {
      return useMutation(getCreateCarbonTransactionMutationOptions(options));
    }

export const getGetCarbonTransactionUrl = (id: number,) => {




  return `/api/carbon-transactions/${id}`
}

export const getCarbonTransaction = async (id: number, options?: RequestInit): Promise<CarbonTransaction> => {

  return customFetch<CarbonTransaction>(getGetCarbonTransactionUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetCarbonTransactionQueryKey = (id: number,) => {
    return [
    `/api/carbon-transactions/${id}`
    ] as const;
    }


export const getGetCarbonTransactionQueryOptions = <TData = Awaited<ReturnType<typeof getCarbonTransaction>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getCarbonTransaction>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCarbonTransactionQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCarbonTransaction>>> = ({ signal }) => getCarbonTransaction(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCarbonTransaction>>, TError, TData> & { queryKey: QueryKey }
}

export type GetCarbonTransactionQueryResult = NonNullable<Awaited<ReturnType<typeof getCarbonTransaction>>>
export type GetCarbonTransactionQueryError = ErrorType<unknown>



export function useGetCarbonTransaction<TData = Awaited<ReturnType<typeof getCarbonTransaction>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getCarbonTransaction>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetCarbonTransactionQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getDeleteCarbonTransactionUrl = (id: number,) => {




  return `/api/carbon-transactions/${id}`
}

export const deleteCarbonTransaction = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteCarbonTransactionUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteCarbonTransactionMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteCarbonTransaction>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteCarbonTransaction>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteCarbonTransaction'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteCarbonTransaction>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteCarbonTransaction(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteCarbonTransactionMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCarbonTransaction>>>

    export type DeleteCarbonTransactionMutationError = ErrorType<unknown>

    export const useDeleteCarbonTransaction = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteCarbonTransaction>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteCarbonTransaction>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteCarbonTransactionMutationOptions(options));
    }

export const getListEnvironmentalGoalsUrl = () => {




  return `/api/environmental-goals`
}

export const listEnvironmentalGoals = async ( options?: RequestInit): Promise<EnvironmentalGoal[]> => {

  return customFetch<EnvironmentalGoal[]>(getListEnvironmentalGoalsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEnvironmentalGoalsQueryKey = () => {
    return [
    `/api/environmental-goals`
    ] as const;
    }


export const getListEnvironmentalGoalsQueryOptions = <TData = Awaited<ReturnType<typeof listEnvironmentalGoals>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEnvironmentalGoals>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEnvironmentalGoalsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEnvironmentalGoals>>> = ({ signal }) => listEnvironmentalGoals({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEnvironmentalGoals>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEnvironmentalGoalsQueryResult = NonNullable<Awaited<ReturnType<typeof listEnvironmentalGoals>>>
export type ListEnvironmentalGoalsQueryError = ErrorType<unknown>



export function useListEnvironmentalGoals<TData = Awaited<ReturnType<typeof listEnvironmentalGoals>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEnvironmentalGoals>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEnvironmentalGoalsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateEnvironmentalGoalUrl = () => {




  return `/api/environmental-goals`
}

export const createEnvironmentalGoal = async (environmentalGoalInput: EnvironmentalGoalInput, options?: RequestInit): Promise<EnvironmentalGoal> => {

  return customFetch<EnvironmentalGoal>(getCreateEnvironmentalGoalUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(environmentalGoalInput)
  }
);}





export const getCreateEnvironmentalGoalMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEnvironmentalGoal>>, TError,{data: BodyType<EnvironmentalGoalInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createEnvironmentalGoal>>, TError,{data: BodyType<EnvironmentalGoalInput>}, TContext> => {

const mutationKey = ['createEnvironmentalGoal'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createEnvironmentalGoal>>, {data: BodyType<EnvironmentalGoalInput>}> = (props) => {
          const {data} = props ?? {};

          return  createEnvironmentalGoal(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateEnvironmentalGoalMutationResult = NonNullable<Awaited<ReturnType<typeof createEnvironmentalGoal>>>
    export type CreateEnvironmentalGoalMutationBody = BodyType<EnvironmentalGoalInput>
    export type CreateEnvironmentalGoalMutationError = ErrorType<unknown>

    export const useCreateEnvironmentalGoal = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEnvironmentalGoal>>, TError,{data: BodyType<EnvironmentalGoalInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createEnvironmentalGoal>>,
        TError,
        {data: BodyType<EnvironmentalGoalInput>},
        TContext
      > => {
      return useMutation(getCreateEnvironmentalGoalMutationOptions(options));
    }

export const getUpdateEnvironmentalGoalUrl = (id: number,) => {




  return `/api/environmental-goals/${id}`
}

export const updateEnvironmentalGoal = async (id: number,
    environmentalGoalUpdate: EnvironmentalGoalUpdate, options?: RequestInit): Promise<EnvironmentalGoal> => {

  return customFetch<EnvironmentalGoal>(getUpdateEnvironmentalGoalUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(environmentalGoalUpdate)
  }
);}





export const getUpdateEnvironmentalGoalMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEnvironmentalGoal>>, TError,{id: number;data: BodyType<EnvironmentalGoalUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateEnvironmentalGoal>>, TError,{id: number;data: BodyType<EnvironmentalGoalUpdate>}, TContext> => {

const mutationKey = ['updateEnvironmentalGoal'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateEnvironmentalGoal>>, {id: number;data: BodyType<EnvironmentalGoalUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateEnvironmentalGoal(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateEnvironmentalGoalMutationResult = NonNullable<Awaited<ReturnType<typeof updateEnvironmentalGoal>>>
    export type UpdateEnvironmentalGoalMutationBody = BodyType<EnvironmentalGoalUpdate>
    export type UpdateEnvironmentalGoalMutationError = ErrorType<unknown>

    export const useUpdateEnvironmentalGoal = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEnvironmentalGoal>>, TError,{id: number;data: BodyType<EnvironmentalGoalUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateEnvironmentalGoal>>,
        TError,
        {id: number;data: BodyType<EnvironmentalGoalUpdate>},
        TContext
      > => {
      return useMutation(getUpdateEnvironmentalGoalMutationOptions(options));
    }

export const getDeleteEnvironmentalGoalUrl = (id: number,) => {




  return `/api/environmental-goals/${id}`
}

export const deleteEnvironmentalGoal = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteEnvironmentalGoalUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteEnvironmentalGoalMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEnvironmentalGoal>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteEnvironmentalGoal>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteEnvironmentalGoal'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteEnvironmentalGoal>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteEnvironmentalGoal(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteEnvironmentalGoalMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEnvironmentalGoal>>>

    export type DeleteEnvironmentalGoalMutationError = ErrorType<unknown>

    export const useDeleteEnvironmentalGoal = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEnvironmentalGoal>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteEnvironmentalGoal>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteEnvironmentalGoalMutationOptions(options));
    }

export const getListCsrActivitiesUrl = () => {




  return `/api/csr-activities`
}

export const listCsrActivities = async ( options?: RequestInit): Promise<CsrActivity[]> => {

  return customFetch<CsrActivity[]>(getListCsrActivitiesUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListCsrActivitiesQueryKey = () => {
    return [
    `/api/csr-activities`
    ] as const;
    }


export const getListCsrActivitiesQueryOptions = <TData = Awaited<ReturnType<typeof listCsrActivities>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listCsrActivities>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListCsrActivitiesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listCsrActivities>>> = ({ signal }) => listCsrActivities({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listCsrActivities>>, TError, TData> & { queryKey: QueryKey }
}

export type ListCsrActivitiesQueryResult = NonNullable<Awaited<ReturnType<typeof listCsrActivities>>>
export type ListCsrActivitiesQueryError = ErrorType<unknown>



export function useListCsrActivities<TData = Awaited<ReturnType<typeof listCsrActivities>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listCsrActivities>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListCsrActivitiesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateCsrActivityUrl = () => {




  return `/api/csr-activities`
}

export const createCsrActivity = async (csrActivityInput: CsrActivityInput, options?: RequestInit): Promise<CsrActivity> => {

  return customFetch<CsrActivity>(getCreateCsrActivityUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(csrActivityInput)
  }
);}





export const getCreateCsrActivityMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createCsrActivity>>, TError,{data: BodyType<CsrActivityInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createCsrActivity>>, TError,{data: BodyType<CsrActivityInput>}, TContext> => {

const mutationKey = ['createCsrActivity'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createCsrActivity>>, {data: BodyType<CsrActivityInput>}> = (props) => {
          const {data} = props ?? {};

          return  createCsrActivity(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateCsrActivityMutationResult = NonNullable<Awaited<ReturnType<typeof createCsrActivity>>>
    export type CreateCsrActivityMutationBody = BodyType<CsrActivityInput>
    export type CreateCsrActivityMutationError = ErrorType<unknown>

    export const useCreateCsrActivity = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createCsrActivity>>, TError,{data: BodyType<CsrActivityInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createCsrActivity>>,
        TError,
        {data: BodyType<CsrActivityInput>},
        TContext
      > => {
      return useMutation(getCreateCsrActivityMutationOptions(options));
    }

export const getGetCsrActivityUrl = (id: number,) => {




  return `/api/csr-activities/${id}`
}

export const getCsrActivity = async (id: number, options?: RequestInit): Promise<CsrActivity> => {

  return customFetch<CsrActivity>(getGetCsrActivityUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetCsrActivityQueryKey = (id: number,) => {
    return [
    `/api/csr-activities/${id}`
    ] as const;
    }


export const getGetCsrActivityQueryOptions = <TData = Awaited<ReturnType<typeof getCsrActivity>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getCsrActivity>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetCsrActivityQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getCsrActivity>>> = ({ signal }) => getCsrActivity(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getCsrActivity>>, TError, TData> & { queryKey: QueryKey }
}

export type GetCsrActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getCsrActivity>>>
export type GetCsrActivityQueryError = ErrorType<unknown>



export function useGetCsrActivity<TData = Awaited<ReturnType<typeof getCsrActivity>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getCsrActivity>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetCsrActivityQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateCsrActivityUrl = (id: number,) => {




  return `/api/csr-activities/${id}`
}

export const updateCsrActivity = async (id: number,
    csrActivityUpdate: CsrActivityUpdate, options?: RequestInit): Promise<CsrActivity> => {

  return customFetch<CsrActivity>(getUpdateCsrActivityUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(csrActivityUpdate)
  }
);}





export const getUpdateCsrActivityMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateCsrActivity>>, TError,{id: number;data: BodyType<CsrActivityUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateCsrActivity>>, TError,{id: number;data: BodyType<CsrActivityUpdate>}, TContext> => {

const mutationKey = ['updateCsrActivity'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateCsrActivity>>, {id: number;data: BodyType<CsrActivityUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateCsrActivity(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateCsrActivityMutationResult = NonNullable<Awaited<ReturnType<typeof updateCsrActivity>>>
    export type UpdateCsrActivityMutationBody = BodyType<CsrActivityUpdate>
    export type UpdateCsrActivityMutationError = ErrorType<unknown>

    export const useUpdateCsrActivity = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateCsrActivity>>, TError,{id: number;data: BodyType<CsrActivityUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateCsrActivity>>,
        TError,
        {id: number;data: BodyType<CsrActivityUpdate>},
        TContext
      > => {
      return useMutation(getUpdateCsrActivityMutationOptions(options));
    }

export const getDeleteCsrActivityUrl = (id: number,) => {




  return `/api/csr-activities/${id}`
}

export const deleteCsrActivity = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteCsrActivityUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteCsrActivityMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteCsrActivity>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteCsrActivity>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteCsrActivity'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteCsrActivity>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteCsrActivity(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteCsrActivityMutationResult = NonNullable<Awaited<ReturnType<typeof deleteCsrActivity>>>

    export type DeleteCsrActivityMutationError = ErrorType<unknown>

    export const useDeleteCsrActivity = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteCsrActivity>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteCsrActivity>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteCsrActivityMutationOptions(options));
    }

export const getListEmployeeParticipationsUrl = (params?: ListEmployeeParticipationsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/employee-participations?${stringifiedParams}` : `/api/employee-participations`
}

export const listEmployeeParticipations = async (params?: ListEmployeeParticipationsParams, options?: RequestInit): Promise<EmployeeParticipation[]> => {

  return customFetch<EmployeeParticipation[]>(getListEmployeeParticipationsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEmployeeParticipationsQueryKey = (params?: ListEmployeeParticipationsParams,) => {
    return [
    `/api/employee-participations`, ...(params ? [params] : [])
    ] as const;
    }


export const getListEmployeeParticipationsQueryOptions = <TData = Awaited<ReturnType<typeof listEmployeeParticipations>>, TError = ErrorType<unknown>>(params?: ListEmployeeParticipationsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployeeParticipations>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEmployeeParticipationsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEmployeeParticipations>>> = ({ signal }) => listEmployeeParticipations(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEmployeeParticipations>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEmployeeParticipationsQueryResult = NonNullable<Awaited<ReturnType<typeof listEmployeeParticipations>>>
export type ListEmployeeParticipationsQueryError = ErrorType<unknown>



export function useListEmployeeParticipations<TData = Awaited<ReturnType<typeof listEmployeeParticipations>>, TError = ErrorType<unknown>>(
 params?: ListEmployeeParticipationsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployeeParticipations>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEmployeeParticipationsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateEmployeeParticipationUrl = () => {




  return `/api/employee-participations`
}

export const createEmployeeParticipation = async (employeeParticipationInput: EmployeeParticipationInput, options?: RequestInit): Promise<EmployeeParticipation> => {

  return customFetch<EmployeeParticipation>(getCreateEmployeeParticipationUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeParticipationInput)
  }
);}





export const getCreateEmployeeParticipationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmployeeParticipation>>, TError,{data: BodyType<EmployeeParticipationInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createEmployeeParticipation>>, TError,{data: BodyType<EmployeeParticipationInput>}, TContext> => {

const mutationKey = ['createEmployeeParticipation'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createEmployeeParticipation>>, {data: BodyType<EmployeeParticipationInput>}> = (props) => {
          const {data} = props ?? {};

          return  createEmployeeParticipation(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateEmployeeParticipationMutationResult = NonNullable<Awaited<ReturnType<typeof createEmployeeParticipation>>>
    export type CreateEmployeeParticipationMutationBody = BodyType<EmployeeParticipationInput>
    export type CreateEmployeeParticipationMutationError = ErrorType<unknown>

    export const useCreateEmployeeParticipation = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEmployeeParticipation>>, TError,{data: BodyType<EmployeeParticipationInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createEmployeeParticipation>>,
        TError,
        {data: BodyType<EmployeeParticipationInput>},
        TContext
      > => {
      return useMutation(getCreateEmployeeParticipationMutationOptions(options));
    }

export const getUpdateEmployeeParticipationUrl = (id: number,) => {




  return `/api/employee-participations/${id}`
}

export const updateEmployeeParticipation = async (id: number,
    employeeParticipationUpdate: EmployeeParticipationUpdate, options?: RequestInit): Promise<EmployeeParticipation> => {

  return customFetch<EmployeeParticipation>(getUpdateEmployeeParticipationUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeParticipationUpdate)
  }
);}





export const getUpdateEmployeeParticipationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmployeeParticipation>>, TError,{id: number;data: BodyType<EmployeeParticipationUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateEmployeeParticipation>>, TError,{id: number;data: BodyType<EmployeeParticipationUpdate>}, TContext> => {

const mutationKey = ['updateEmployeeParticipation'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateEmployeeParticipation>>, {id: number;data: BodyType<EmployeeParticipationUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateEmployeeParticipation(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateEmployeeParticipationMutationResult = NonNullable<Awaited<ReturnType<typeof updateEmployeeParticipation>>>
    export type UpdateEmployeeParticipationMutationBody = BodyType<EmployeeParticipationUpdate>
    export type UpdateEmployeeParticipationMutationError = ErrorType<unknown>

    export const useUpdateEmployeeParticipation = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEmployeeParticipation>>, TError,{id: number;data: BodyType<EmployeeParticipationUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateEmployeeParticipation>>,
        TError,
        {id: number;data: BodyType<EmployeeParticipationUpdate>},
        TContext
      > => {
      return useMutation(getUpdateEmployeeParticipationMutationOptions(options));
    }

export const getListEsgPoliciesUrl = () => {




  return `/api/esg-policies`
}

export const listEsgPolicies = async ( options?: RequestInit): Promise<EsgPolicy[]> => {

  return customFetch<EsgPolicy[]>(getListEsgPoliciesUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEsgPoliciesQueryKey = () => {
    return [
    `/api/esg-policies`
    ] as const;
    }


export const getListEsgPoliciesQueryOptions = <TData = Awaited<ReturnType<typeof listEsgPolicies>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEsgPolicies>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEsgPoliciesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEsgPolicies>>> = ({ signal }) => listEsgPolicies({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEsgPolicies>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEsgPoliciesQueryResult = NonNullable<Awaited<ReturnType<typeof listEsgPolicies>>>
export type ListEsgPoliciesQueryError = ErrorType<unknown>



export function useListEsgPolicies<TData = Awaited<ReturnType<typeof listEsgPolicies>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEsgPolicies>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEsgPoliciesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateEsgPolicyUrl = () => {




  return `/api/esg-policies`
}

export const createEsgPolicy = async (esgPolicyInput: EsgPolicyInput, options?: RequestInit): Promise<EsgPolicy> => {

  return customFetch<EsgPolicy>(getCreateEsgPolicyUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(esgPolicyInput)
  }
);}





export const getCreateEsgPolicyMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEsgPolicy>>, TError,{data: BodyType<EsgPolicyInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createEsgPolicy>>, TError,{data: BodyType<EsgPolicyInput>}, TContext> => {

const mutationKey = ['createEsgPolicy'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createEsgPolicy>>, {data: BodyType<EsgPolicyInput>}> = (props) => {
          const {data} = props ?? {};

          return  createEsgPolicy(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateEsgPolicyMutationResult = NonNullable<Awaited<ReturnType<typeof createEsgPolicy>>>
    export type CreateEsgPolicyMutationBody = BodyType<EsgPolicyInput>
    export type CreateEsgPolicyMutationError = ErrorType<unknown>

    export const useCreateEsgPolicy = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createEsgPolicy>>, TError,{data: BodyType<EsgPolicyInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createEsgPolicy>>,
        TError,
        {data: BodyType<EsgPolicyInput>},
        TContext
      > => {
      return useMutation(getCreateEsgPolicyMutationOptions(options));
    }

export const getGetEsgPolicyUrl = (id: number,) => {




  return `/api/esg-policies/${id}`
}

export const getEsgPolicy = async (id: number, options?: RequestInit): Promise<EsgPolicy> => {

  return customFetch<EsgPolicy>(getGetEsgPolicyUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEsgPolicyQueryKey = (id: number,) => {
    return [
    `/api/esg-policies/${id}`
    ] as const;
    }


export const getGetEsgPolicyQueryOptions = <TData = Awaited<ReturnType<typeof getEsgPolicy>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEsgPolicy>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEsgPolicyQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEsgPolicy>>> = ({ signal }) => getEsgPolicy(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEsgPolicy>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEsgPolicyQueryResult = NonNullable<Awaited<ReturnType<typeof getEsgPolicy>>>
export type GetEsgPolicyQueryError = ErrorType<unknown>



export function useGetEsgPolicy<TData = Awaited<ReturnType<typeof getEsgPolicy>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEsgPolicy>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEsgPolicyQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateEsgPolicyUrl = (id: number,) => {




  return `/api/esg-policies/${id}`
}

export const updateEsgPolicy = async (id: number,
    esgPolicyUpdate: EsgPolicyUpdate, options?: RequestInit): Promise<EsgPolicy> => {

  return customFetch<EsgPolicy>(getUpdateEsgPolicyUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(esgPolicyUpdate)
  }
);}





export const getUpdateEsgPolicyMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEsgPolicy>>, TError,{id: number;data: BodyType<EsgPolicyUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateEsgPolicy>>, TError,{id: number;data: BodyType<EsgPolicyUpdate>}, TContext> => {

const mutationKey = ['updateEsgPolicy'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateEsgPolicy>>, {id: number;data: BodyType<EsgPolicyUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateEsgPolicy(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateEsgPolicyMutationResult = NonNullable<Awaited<ReturnType<typeof updateEsgPolicy>>>
    export type UpdateEsgPolicyMutationBody = BodyType<EsgPolicyUpdate>
    export type UpdateEsgPolicyMutationError = ErrorType<unknown>

    export const useUpdateEsgPolicy = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateEsgPolicy>>, TError,{id: number;data: BodyType<EsgPolicyUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateEsgPolicy>>,
        TError,
        {id: number;data: BodyType<EsgPolicyUpdate>},
        TContext
      > => {
      return useMutation(getUpdateEsgPolicyMutationOptions(options));
    }

export const getDeleteEsgPolicyUrl = (id: number,) => {




  return `/api/esg-policies/${id}`
}

export const deleteEsgPolicy = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteEsgPolicyUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteEsgPolicyMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEsgPolicy>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteEsgPolicy>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteEsgPolicy'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteEsgPolicy>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteEsgPolicy(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteEsgPolicyMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEsgPolicy>>>

    export type DeleteEsgPolicyMutationError = ErrorType<unknown>

    export const useDeleteEsgPolicy = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteEsgPolicy>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteEsgPolicy>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteEsgPolicyMutationOptions(options));
    }

export const getListPolicyAcknowledgementsUrl = (params?: ListPolicyAcknowledgementsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/policy-acknowledgements?${stringifiedParams}` : `/api/policy-acknowledgements`
}

export const listPolicyAcknowledgements = async (params?: ListPolicyAcknowledgementsParams, options?: RequestInit): Promise<PolicyAcknowledgement[]> => {

  return customFetch<PolicyAcknowledgement[]>(getListPolicyAcknowledgementsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListPolicyAcknowledgementsQueryKey = (params?: ListPolicyAcknowledgementsParams,) => {
    return [
    `/api/policy-acknowledgements`, ...(params ? [params] : [])
    ] as const;
    }


export const getListPolicyAcknowledgementsQueryOptions = <TData = Awaited<ReturnType<typeof listPolicyAcknowledgements>>, TError = ErrorType<unknown>>(params?: ListPolicyAcknowledgementsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listPolicyAcknowledgements>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListPolicyAcknowledgementsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listPolicyAcknowledgements>>> = ({ signal }) => listPolicyAcknowledgements(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listPolicyAcknowledgements>>, TError, TData> & { queryKey: QueryKey }
}

export type ListPolicyAcknowledgementsQueryResult = NonNullable<Awaited<ReturnType<typeof listPolicyAcknowledgements>>>
export type ListPolicyAcknowledgementsQueryError = ErrorType<unknown>



export function useListPolicyAcknowledgements<TData = Awaited<ReturnType<typeof listPolicyAcknowledgements>>, TError = ErrorType<unknown>>(
 params?: ListPolicyAcknowledgementsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listPolicyAcknowledgements>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListPolicyAcknowledgementsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreatePolicyAcknowledgementUrl = () => {




  return `/api/policy-acknowledgements`
}

export const createPolicyAcknowledgement = async (policyAcknowledgementInput: PolicyAcknowledgementInput, options?: RequestInit): Promise<PolicyAcknowledgement> => {

  return customFetch<PolicyAcknowledgement>(getCreatePolicyAcknowledgementUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(policyAcknowledgementInput)
  }
);}





export const getCreatePolicyAcknowledgementMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createPolicyAcknowledgement>>, TError,{data: BodyType<PolicyAcknowledgementInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createPolicyAcknowledgement>>, TError,{data: BodyType<PolicyAcknowledgementInput>}, TContext> => {

const mutationKey = ['createPolicyAcknowledgement'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createPolicyAcknowledgement>>, {data: BodyType<PolicyAcknowledgementInput>}> = (props) => {
          const {data} = props ?? {};

          return  createPolicyAcknowledgement(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreatePolicyAcknowledgementMutationResult = NonNullable<Awaited<ReturnType<typeof createPolicyAcknowledgement>>>
    export type CreatePolicyAcknowledgementMutationBody = BodyType<PolicyAcknowledgementInput>
    export type CreatePolicyAcknowledgementMutationError = ErrorType<unknown>

    export const useCreatePolicyAcknowledgement = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createPolicyAcknowledgement>>, TError,{data: BodyType<PolicyAcknowledgementInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createPolicyAcknowledgement>>,
        TError,
        {data: BodyType<PolicyAcknowledgementInput>},
        TContext
      > => {
      return useMutation(getCreatePolicyAcknowledgementMutationOptions(options));
    }

export const getListAuditsUrl = () => {




  return `/api/audits`
}

export const listAudits = async ( options?: RequestInit): Promise<Audit[]> => {

  return customFetch<Audit[]>(getListAuditsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListAuditsQueryKey = () => {
    return [
    `/api/audits`
    ] as const;
    }


export const getListAuditsQueryOptions = <TData = Awaited<ReturnType<typeof listAudits>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listAudits>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListAuditsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listAudits>>> = ({ signal }) => listAudits({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listAudits>>, TError, TData> & { queryKey: QueryKey }
}

export type ListAuditsQueryResult = NonNullable<Awaited<ReturnType<typeof listAudits>>>
export type ListAuditsQueryError = ErrorType<unknown>



export function useListAudits<TData = Awaited<ReturnType<typeof listAudits>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listAudits>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListAuditsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateAuditUrl = () => {




  return `/api/audits`
}

export const createAudit = async (auditInput: AuditInput, options?: RequestInit): Promise<Audit> => {

  return customFetch<Audit>(getCreateAuditUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(auditInput)
  }
);}





export const getCreateAuditMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createAudit>>, TError,{data: BodyType<AuditInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createAudit>>, TError,{data: BodyType<AuditInput>}, TContext> => {

const mutationKey = ['createAudit'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createAudit>>, {data: BodyType<AuditInput>}> = (props) => {
          const {data} = props ?? {};

          return  createAudit(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateAuditMutationResult = NonNullable<Awaited<ReturnType<typeof createAudit>>>
    export type CreateAuditMutationBody = BodyType<AuditInput>
    export type CreateAuditMutationError = ErrorType<unknown>

    export const useCreateAudit = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createAudit>>, TError,{data: BodyType<AuditInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createAudit>>,
        TError,
        {data: BodyType<AuditInput>},
        TContext
      > => {
      return useMutation(getCreateAuditMutationOptions(options));
    }

export const getGetAuditUrl = (id: number,) => {




  return `/api/audits/${id}`
}

export const getAudit = async (id: number, options?: RequestInit): Promise<Audit> => {

  return customFetch<Audit>(getGetAuditUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetAuditQueryKey = (id: number,) => {
    return [
    `/api/audits/${id}`
    ] as const;
    }


export const getGetAuditQueryOptions = <TData = Awaited<ReturnType<typeof getAudit>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getAudit>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAuditQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAudit>>> = ({ signal }) => getAudit(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAudit>>, TError, TData> & { queryKey: QueryKey }
}

export type GetAuditQueryResult = NonNullable<Awaited<ReturnType<typeof getAudit>>>
export type GetAuditQueryError = ErrorType<unknown>



export function useGetAudit<TData = Awaited<ReturnType<typeof getAudit>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getAudit>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetAuditQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateAuditUrl = (id: number,) => {




  return `/api/audits/${id}`
}

export const updateAudit = async (id: number,
    auditUpdate: AuditUpdate, options?: RequestInit): Promise<Audit> => {

  return customFetch<Audit>(getUpdateAuditUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(auditUpdate)
  }
);}





export const getUpdateAuditMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateAudit>>, TError,{id: number;data: BodyType<AuditUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateAudit>>, TError,{id: number;data: BodyType<AuditUpdate>}, TContext> => {

const mutationKey = ['updateAudit'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateAudit>>, {id: number;data: BodyType<AuditUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateAudit(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateAuditMutationResult = NonNullable<Awaited<ReturnType<typeof updateAudit>>>
    export type UpdateAuditMutationBody = BodyType<AuditUpdate>
    export type UpdateAuditMutationError = ErrorType<unknown>

    export const useUpdateAudit = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateAudit>>, TError,{id: number;data: BodyType<AuditUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateAudit>>,
        TError,
        {id: number;data: BodyType<AuditUpdate>},
        TContext
      > => {
      return useMutation(getUpdateAuditMutationOptions(options));
    }

export const getListComplianceIssuesUrl = (params?: ListComplianceIssuesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/compliance-issues?${stringifiedParams}` : `/api/compliance-issues`
}

export const listComplianceIssues = async (params?: ListComplianceIssuesParams, options?: RequestInit): Promise<ComplianceIssue[]> => {

  return customFetch<ComplianceIssue[]>(getListComplianceIssuesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListComplianceIssuesQueryKey = (params?: ListComplianceIssuesParams,) => {
    return [
    `/api/compliance-issues`, ...(params ? [params] : [])
    ] as const;
    }


export const getListComplianceIssuesQueryOptions = <TData = Awaited<ReturnType<typeof listComplianceIssues>>, TError = ErrorType<unknown>>(params?: ListComplianceIssuesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listComplianceIssues>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListComplianceIssuesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listComplianceIssues>>> = ({ signal }) => listComplianceIssues(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listComplianceIssues>>, TError, TData> & { queryKey: QueryKey }
}

export type ListComplianceIssuesQueryResult = NonNullable<Awaited<ReturnType<typeof listComplianceIssues>>>
export type ListComplianceIssuesQueryError = ErrorType<unknown>



export function useListComplianceIssues<TData = Awaited<ReturnType<typeof listComplianceIssues>>, TError = ErrorType<unknown>>(
 params?: ListComplianceIssuesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listComplianceIssues>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListComplianceIssuesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateComplianceIssueUrl = () => {




  return `/api/compliance-issues`
}

export const createComplianceIssue = async (complianceIssueInput: ComplianceIssueInput, options?: RequestInit): Promise<ComplianceIssue> => {

  return customFetch<ComplianceIssue>(getCreateComplianceIssueUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(complianceIssueInput)
  }
);}





export const getCreateComplianceIssueMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createComplianceIssue>>, TError,{data: BodyType<ComplianceIssueInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createComplianceIssue>>, TError,{data: BodyType<ComplianceIssueInput>}, TContext> => {

const mutationKey = ['createComplianceIssue'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createComplianceIssue>>, {data: BodyType<ComplianceIssueInput>}> = (props) => {
          const {data} = props ?? {};

          return  createComplianceIssue(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateComplianceIssueMutationResult = NonNullable<Awaited<ReturnType<typeof createComplianceIssue>>>
    export type CreateComplianceIssueMutationBody = BodyType<ComplianceIssueInput>
    export type CreateComplianceIssueMutationError = ErrorType<unknown>

    export const useCreateComplianceIssue = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createComplianceIssue>>, TError,{data: BodyType<ComplianceIssueInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createComplianceIssue>>,
        TError,
        {data: BodyType<ComplianceIssueInput>},
        TContext
      > => {
      return useMutation(getCreateComplianceIssueMutationOptions(options));
    }

export const getGetComplianceIssueUrl = (id: number,) => {




  return `/api/compliance-issues/${id}`
}

export const getComplianceIssue = async (id: number, options?: RequestInit): Promise<ComplianceIssue> => {

  return customFetch<ComplianceIssue>(getGetComplianceIssueUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetComplianceIssueQueryKey = (id: number,) => {
    return [
    `/api/compliance-issues/${id}`
    ] as const;
    }


export const getGetComplianceIssueQueryOptions = <TData = Awaited<ReturnType<typeof getComplianceIssue>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getComplianceIssue>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetComplianceIssueQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getComplianceIssue>>> = ({ signal }) => getComplianceIssue(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getComplianceIssue>>, TError, TData> & { queryKey: QueryKey }
}

export type GetComplianceIssueQueryResult = NonNullable<Awaited<ReturnType<typeof getComplianceIssue>>>
export type GetComplianceIssueQueryError = ErrorType<unknown>



export function useGetComplianceIssue<TData = Awaited<ReturnType<typeof getComplianceIssue>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getComplianceIssue>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetComplianceIssueQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateComplianceIssueUrl = (id: number,) => {




  return `/api/compliance-issues/${id}`
}

export const updateComplianceIssue = async (id: number,
    complianceIssueUpdate: ComplianceIssueUpdate, options?: RequestInit): Promise<ComplianceIssue> => {

  return customFetch<ComplianceIssue>(getUpdateComplianceIssueUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(complianceIssueUpdate)
  }
);}





export const getUpdateComplianceIssueMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateComplianceIssue>>, TError,{id: number;data: BodyType<ComplianceIssueUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateComplianceIssue>>, TError,{id: number;data: BodyType<ComplianceIssueUpdate>}, TContext> => {

const mutationKey = ['updateComplianceIssue'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateComplianceIssue>>, {id: number;data: BodyType<ComplianceIssueUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateComplianceIssue(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateComplianceIssueMutationResult = NonNullable<Awaited<ReturnType<typeof updateComplianceIssue>>>
    export type UpdateComplianceIssueMutationBody = BodyType<ComplianceIssueUpdate>
    export type UpdateComplianceIssueMutationError = ErrorType<unknown>

    export const useUpdateComplianceIssue = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateComplianceIssue>>, TError,{id: number;data: BodyType<ComplianceIssueUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateComplianceIssue>>,
        TError,
        {id: number;data: BodyType<ComplianceIssueUpdate>},
        TContext
      > => {
      return useMutation(getUpdateComplianceIssueMutationOptions(options));
    }

export const getListChallengesUrl = (params?: ListChallengesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/challenges?${stringifiedParams}` : `/api/challenges`
}

export const listChallenges = async (params?: ListChallengesParams, options?: RequestInit): Promise<Challenge[]> => {

  return customFetch<Challenge[]>(getListChallengesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListChallengesQueryKey = (params?: ListChallengesParams,) => {
    return [
    `/api/challenges`, ...(params ? [params] : [])
    ] as const;
    }


export const getListChallengesQueryOptions = <TData = Awaited<ReturnType<typeof listChallenges>>, TError = ErrorType<unknown>>(params?: ListChallengesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listChallenges>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListChallengesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listChallenges>>> = ({ signal }) => listChallenges(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listChallenges>>, TError, TData> & { queryKey: QueryKey }
}

export type ListChallengesQueryResult = NonNullable<Awaited<ReturnType<typeof listChallenges>>>
export type ListChallengesQueryError = ErrorType<unknown>



export function useListChallenges<TData = Awaited<ReturnType<typeof listChallenges>>, TError = ErrorType<unknown>>(
 params?: ListChallengesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listChallenges>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListChallengesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateChallengeUrl = () => {




  return `/api/challenges`
}

export const createChallenge = async (challengeInput: ChallengeInput, options?: RequestInit): Promise<Challenge> => {

  return customFetch<Challenge>(getCreateChallengeUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(challengeInput)
  }
);}





export const getCreateChallengeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createChallenge>>, TError,{data: BodyType<ChallengeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createChallenge>>, TError,{data: BodyType<ChallengeInput>}, TContext> => {

const mutationKey = ['createChallenge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createChallenge>>, {data: BodyType<ChallengeInput>}> = (props) => {
          const {data} = props ?? {};

          return  createChallenge(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateChallengeMutationResult = NonNullable<Awaited<ReturnType<typeof createChallenge>>>
    export type CreateChallengeMutationBody = BodyType<ChallengeInput>
    export type CreateChallengeMutationError = ErrorType<unknown>

    export const useCreateChallenge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createChallenge>>, TError,{data: BodyType<ChallengeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createChallenge>>,
        TError,
        {data: BodyType<ChallengeInput>},
        TContext
      > => {
      return useMutation(getCreateChallengeMutationOptions(options));
    }

export const getGetChallengeUrl = (id: number,) => {




  return `/api/challenges/${id}`
}

export const getChallenge = async (id: number, options?: RequestInit): Promise<Challenge> => {

  return customFetch<Challenge>(getGetChallengeUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetChallengeQueryKey = (id: number,) => {
    return [
    `/api/challenges/${id}`
    ] as const;
    }


export const getGetChallengeQueryOptions = <TData = Awaited<ReturnType<typeof getChallenge>>, TError = ErrorType<unknown>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getChallenge>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetChallengeQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getChallenge>>> = ({ signal }) => getChallenge(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getChallenge>>, TError, TData> & { queryKey: QueryKey }
}

export type GetChallengeQueryResult = NonNullable<Awaited<ReturnType<typeof getChallenge>>>
export type GetChallengeQueryError = ErrorType<unknown>



export function useGetChallenge<TData = Awaited<ReturnType<typeof getChallenge>>, TError = ErrorType<unknown>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getChallenge>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetChallengeQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateChallengeUrl = (id: number,) => {




  return `/api/challenges/${id}`
}

export const updateChallenge = async (id: number,
    challengeUpdate: ChallengeUpdate, options?: RequestInit): Promise<Challenge> => {

  return customFetch<Challenge>(getUpdateChallengeUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(challengeUpdate)
  }
);}





export const getUpdateChallengeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateChallenge>>, TError,{id: number;data: BodyType<ChallengeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateChallenge>>, TError,{id: number;data: BodyType<ChallengeUpdate>}, TContext> => {

const mutationKey = ['updateChallenge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateChallenge>>, {id: number;data: BodyType<ChallengeUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateChallenge(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateChallengeMutationResult = NonNullable<Awaited<ReturnType<typeof updateChallenge>>>
    export type UpdateChallengeMutationBody = BodyType<ChallengeUpdate>
    export type UpdateChallengeMutationError = ErrorType<unknown>

    export const useUpdateChallenge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateChallenge>>, TError,{id: number;data: BodyType<ChallengeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateChallenge>>,
        TError,
        {id: number;data: BodyType<ChallengeUpdate>},
        TContext
      > => {
      return useMutation(getUpdateChallengeMutationOptions(options));
    }

export const getDeleteChallengeUrl = (id: number,) => {




  return `/api/challenges/${id}`
}

export const deleteChallenge = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteChallengeUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteChallengeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteChallenge>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteChallenge>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteChallenge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteChallenge>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteChallenge(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteChallengeMutationResult = NonNullable<Awaited<ReturnType<typeof deleteChallenge>>>

    export type DeleteChallengeMutationError = ErrorType<unknown>

    export const useDeleteChallenge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteChallenge>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteChallenge>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteChallengeMutationOptions(options));
    }

export const getListChallengeParticipationsUrl = (params?: ListChallengeParticipationsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/challenge-participations?${stringifiedParams}` : `/api/challenge-participations`
}

export const listChallengeParticipations = async (params?: ListChallengeParticipationsParams, options?: RequestInit): Promise<ChallengeParticipation[]> => {

  return customFetch<ChallengeParticipation[]>(getListChallengeParticipationsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListChallengeParticipationsQueryKey = (params?: ListChallengeParticipationsParams,) => {
    return [
    `/api/challenge-participations`, ...(params ? [params] : [])
    ] as const;
    }


export const getListChallengeParticipationsQueryOptions = <TData = Awaited<ReturnType<typeof listChallengeParticipations>>, TError = ErrorType<unknown>>(params?: ListChallengeParticipationsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listChallengeParticipations>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListChallengeParticipationsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listChallengeParticipations>>> = ({ signal }) => listChallengeParticipations(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listChallengeParticipations>>, TError, TData> & { queryKey: QueryKey }
}

export type ListChallengeParticipationsQueryResult = NonNullable<Awaited<ReturnType<typeof listChallengeParticipations>>>
export type ListChallengeParticipationsQueryError = ErrorType<unknown>



export function useListChallengeParticipations<TData = Awaited<ReturnType<typeof listChallengeParticipations>>, TError = ErrorType<unknown>>(
 params?: ListChallengeParticipationsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listChallengeParticipations>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListChallengeParticipationsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateChallengeParticipationUrl = () => {




  return `/api/challenge-participations`
}

export const createChallengeParticipation = async (challengeParticipationInput: ChallengeParticipationInput, options?: RequestInit): Promise<ChallengeParticipation> => {

  return customFetch<ChallengeParticipation>(getCreateChallengeParticipationUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(challengeParticipationInput)
  }
);}





export const getCreateChallengeParticipationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createChallengeParticipation>>, TError,{data: BodyType<ChallengeParticipationInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createChallengeParticipation>>, TError,{data: BodyType<ChallengeParticipationInput>}, TContext> => {

const mutationKey = ['createChallengeParticipation'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createChallengeParticipation>>, {data: BodyType<ChallengeParticipationInput>}> = (props) => {
          const {data} = props ?? {};

          return  createChallengeParticipation(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateChallengeParticipationMutationResult = NonNullable<Awaited<ReturnType<typeof createChallengeParticipation>>>
    export type CreateChallengeParticipationMutationBody = BodyType<ChallengeParticipationInput>
    export type CreateChallengeParticipationMutationError = ErrorType<unknown>

    export const useCreateChallengeParticipation = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createChallengeParticipation>>, TError,{data: BodyType<ChallengeParticipationInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createChallengeParticipation>>,
        TError,
        {data: BodyType<ChallengeParticipationInput>},
        TContext
      > => {
      return useMutation(getCreateChallengeParticipationMutationOptions(options));
    }

export const getUpdateChallengeParticipationUrl = (id: number,) => {




  return `/api/challenge-participations/${id}`
}

export const updateChallengeParticipation = async (id: number,
    challengeParticipationUpdate: ChallengeParticipationUpdate, options?: RequestInit): Promise<ChallengeParticipation> => {

  return customFetch<ChallengeParticipation>(getUpdateChallengeParticipationUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(challengeParticipationUpdate)
  }
);}





export const getUpdateChallengeParticipationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateChallengeParticipation>>, TError,{id: number;data: BodyType<ChallengeParticipationUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateChallengeParticipation>>, TError,{id: number;data: BodyType<ChallengeParticipationUpdate>}, TContext> => {

const mutationKey = ['updateChallengeParticipation'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateChallengeParticipation>>, {id: number;data: BodyType<ChallengeParticipationUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateChallengeParticipation(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateChallengeParticipationMutationResult = NonNullable<Awaited<ReturnType<typeof updateChallengeParticipation>>>
    export type UpdateChallengeParticipationMutationBody = BodyType<ChallengeParticipationUpdate>
    export type UpdateChallengeParticipationMutationError = ErrorType<unknown>

    export const useUpdateChallengeParticipation = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateChallengeParticipation>>, TError,{id: number;data: BodyType<ChallengeParticipationUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateChallengeParticipation>>,
        TError,
        {id: number;data: BodyType<ChallengeParticipationUpdate>},
        TContext
      > => {
      return useMutation(getUpdateChallengeParticipationMutationOptions(options));
    }

export const getListBadgesUrl = () => {




  return `/api/badges`
}

export const listBadges = async ( options?: RequestInit): Promise<Badge[]> => {

  return customFetch<Badge[]>(getListBadgesUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListBadgesQueryKey = () => {
    return [
    `/api/badges`
    ] as const;
    }


export const getListBadgesQueryOptions = <TData = Awaited<ReturnType<typeof listBadges>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listBadges>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListBadgesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listBadges>>> = ({ signal }) => listBadges({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listBadges>>, TError, TData> & { queryKey: QueryKey }
}

export type ListBadgesQueryResult = NonNullable<Awaited<ReturnType<typeof listBadges>>>
export type ListBadgesQueryError = ErrorType<unknown>



export function useListBadges<TData = Awaited<ReturnType<typeof listBadges>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listBadges>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListBadgesQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateBadgeUrl = () => {




  return `/api/badges`
}

export const createBadge = async (badgeInput: BadgeInput, options?: RequestInit): Promise<Badge> => {

  return customFetch<Badge>(getCreateBadgeUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(badgeInput)
  }
);}





export const getCreateBadgeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createBadge>>, TError,{data: BodyType<BadgeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createBadge>>, TError,{data: BodyType<BadgeInput>}, TContext> => {

const mutationKey = ['createBadge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createBadge>>, {data: BodyType<BadgeInput>}> = (props) => {
          const {data} = props ?? {};

          return  createBadge(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateBadgeMutationResult = NonNullable<Awaited<ReturnType<typeof createBadge>>>
    export type CreateBadgeMutationBody = BodyType<BadgeInput>
    export type CreateBadgeMutationError = ErrorType<unknown>

    export const useCreateBadge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createBadge>>, TError,{data: BodyType<BadgeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createBadge>>,
        TError,
        {data: BodyType<BadgeInput>},
        TContext
      > => {
      return useMutation(getCreateBadgeMutationOptions(options));
    }

export const getUpdateBadgeUrl = (id: number,) => {




  return `/api/badges/${id}`
}

export const updateBadge = async (id: number,
    badgeUpdate: BadgeUpdate, options?: RequestInit): Promise<Badge> => {

  return customFetch<Badge>(getUpdateBadgeUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(badgeUpdate)
  }
);}





export const getUpdateBadgeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateBadge>>, TError,{id: number;data: BodyType<BadgeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateBadge>>, TError,{id: number;data: BodyType<BadgeUpdate>}, TContext> => {

const mutationKey = ['updateBadge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateBadge>>, {id: number;data: BodyType<BadgeUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateBadge(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateBadgeMutationResult = NonNullable<Awaited<ReturnType<typeof updateBadge>>>
    export type UpdateBadgeMutationBody = BodyType<BadgeUpdate>
    export type UpdateBadgeMutationError = ErrorType<unknown>

    export const useUpdateBadge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateBadge>>, TError,{id: number;data: BodyType<BadgeUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateBadge>>,
        TError,
        {id: number;data: BodyType<BadgeUpdate>},
        TContext
      > => {
      return useMutation(getUpdateBadgeMutationOptions(options));
    }

export const getDeleteBadgeUrl = (id: number,) => {




  return `/api/badges/${id}`
}

export const deleteBadge = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteBadgeUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteBadgeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteBadge>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteBadge>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteBadge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteBadge>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteBadge(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteBadgeMutationResult = NonNullable<Awaited<ReturnType<typeof deleteBadge>>>

    export type DeleteBadgeMutationError = ErrorType<unknown>

    export const useDeleteBadge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteBadge>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteBadge>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteBadgeMutationOptions(options));
    }

export const getListEmployeeBadgesUrl = (params?: ListEmployeeBadgesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/employee-badges?${stringifiedParams}` : `/api/employee-badges`
}

export const listEmployeeBadges = async (params?: ListEmployeeBadgesParams, options?: RequestInit): Promise<EmployeeBadge[]> => {

  return customFetch<EmployeeBadge[]>(getListEmployeeBadgesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListEmployeeBadgesQueryKey = (params?: ListEmployeeBadgesParams,) => {
    return [
    `/api/employee-badges`, ...(params ? [params] : [])
    ] as const;
    }


export const getListEmployeeBadgesQueryOptions = <TData = Awaited<ReturnType<typeof listEmployeeBadges>>, TError = ErrorType<unknown>>(params?: ListEmployeeBadgesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployeeBadges>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListEmployeeBadgesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listEmployeeBadges>>> = ({ signal }) => listEmployeeBadges(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listEmployeeBadges>>, TError, TData> & { queryKey: QueryKey }
}

export type ListEmployeeBadgesQueryResult = NonNullable<Awaited<ReturnType<typeof listEmployeeBadges>>>
export type ListEmployeeBadgesQueryError = ErrorType<unknown>



export function useListEmployeeBadges<TData = Awaited<ReturnType<typeof listEmployeeBadges>>, TError = ErrorType<unknown>>(
 params?: ListEmployeeBadgesParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listEmployeeBadges>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListEmployeeBadgesQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getAwardBadgeUrl = () => {




  return `/api/employee-badges`
}

export const awardBadge = async (employeeBadgeInput: EmployeeBadgeInput, options?: RequestInit): Promise<EmployeeBadge> => {

  return customFetch<EmployeeBadge>(getAwardBadgeUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(employeeBadgeInput)
  }
);}





export const getAwardBadgeMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardBadge>>, TError,{data: BodyType<EmployeeBadgeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof awardBadge>>, TError,{data: BodyType<EmployeeBadgeInput>}, TContext> => {

const mutationKey = ['awardBadge'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof awardBadge>>, {data: BodyType<EmployeeBadgeInput>}> = (props) => {
          const {data} = props ?? {};

          return  awardBadge(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AwardBadgeMutationResult = NonNullable<Awaited<ReturnType<typeof awardBadge>>>
    export type AwardBadgeMutationBody = BodyType<EmployeeBadgeInput>
    export type AwardBadgeMutationError = ErrorType<unknown>

    export const useAwardBadge = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardBadge>>, TError,{data: BodyType<EmployeeBadgeInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof awardBadge>>,
        TError,
        {data: BodyType<EmployeeBadgeInput>},
        TContext
      > => {
      return useMutation(getAwardBadgeMutationOptions(options));
    }

export const getListRewardsUrl = () => {




  return `/api/rewards`
}

export const listRewards = async ( options?: RequestInit): Promise<Reward[]> => {

  return customFetch<Reward[]>(getListRewardsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListRewardsQueryKey = () => {
    return [
    `/api/rewards`
    ] as const;
    }


export const getListRewardsQueryOptions = <TData = Awaited<ReturnType<typeof listRewards>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listRewards>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListRewardsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listRewards>>> = ({ signal }) => listRewards({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listRewards>>, TError, TData> & { queryKey: QueryKey }
}

export type ListRewardsQueryResult = NonNullable<Awaited<ReturnType<typeof listRewards>>>
export type ListRewardsQueryError = ErrorType<unknown>



export function useListRewards<TData = Awaited<ReturnType<typeof listRewards>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listRewards>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListRewardsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getCreateRewardUrl = () => {




  return `/api/rewards`
}

export const createReward = async (rewardInput: RewardInput, options?: RequestInit): Promise<Reward> => {

  return customFetch<Reward>(getCreateRewardUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(rewardInput)
  }
);}





export const getCreateRewardMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createReward>>, TError,{data: BodyType<RewardInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof createReward>>, TError,{data: BodyType<RewardInput>}, TContext> => {

const mutationKey = ['createReward'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createReward>>, {data: BodyType<RewardInput>}> = (props) => {
          const {data} = props ?? {};

          return  createReward(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type CreateRewardMutationResult = NonNullable<Awaited<ReturnType<typeof createReward>>>
    export type CreateRewardMutationBody = BodyType<RewardInput>
    export type CreateRewardMutationError = ErrorType<unknown>

    export const useCreateReward = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createReward>>, TError,{data: BodyType<RewardInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof createReward>>,
        TError,
        {data: BodyType<RewardInput>},
        TContext
      > => {
      return useMutation(getCreateRewardMutationOptions(options));
    }

export const getUpdateRewardUrl = (id: number,) => {




  return `/api/rewards/${id}`
}

export const updateReward = async (id: number,
    rewardUpdate: RewardUpdate, options?: RequestInit): Promise<Reward> => {

  return customFetch<Reward>(getUpdateRewardUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(rewardUpdate)
  }
);}





export const getUpdateRewardMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateReward>>, TError,{id: number;data: BodyType<RewardUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateReward>>, TError,{id: number;data: BodyType<RewardUpdate>}, TContext> => {

const mutationKey = ['updateReward'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateReward>>, {id: number;data: BodyType<RewardUpdate>}> = (props) => {
          const {id,data} = props ?? {};

          return  updateReward(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateRewardMutationResult = NonNullable<Awaited<ReturnType<typeof updateReward>>>
    export type UpdateRewardMutationBody = BodyType<RewardUpdate>
    export type UpdateRewardMutationError = ErrorType<unknown>

    export const useUpdateReward = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateReward>>, TError,{id: number;data: BodyType<RewardUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateReward>>,
        TError,
        {id: number;data: BodyType<RewardUpdate>},
        TContext
      > => {
      return useMutation(getUpdateRewardMutationOptions(options));
    }

export const getDeleteRewardUrl = (id: number,) => {




  return `/api/rewards/${id}`
}

export const deleteReward = async (id: number, options?: RequestInit): Promise<void> => {

  return customFetch<void>(getDeleteRewardUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}





export const getDeleteRewardMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteReward>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteReward>>, TError,{id: number}, TContext> => {

const mutationKey = ['deleteReward'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteReward>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteReward(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type DeleteRewardMutationResult = NonNullable<Awaited<ReturnType<typeof deleteReward>>>

    export type DeleteRewardMutationError = ErrorType<unknown>

    export const useDeleteReward = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteReward>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof deleteReward>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getDeleteRewardMutationOptions(options));
    }

export const getListRewardRedemptionsUrl = (params?: ListRewardRedemptionsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reward-redemptions?${stringifiedParams}` : `/api/reward-redemptions`
}

export const listRewardRedemptions = async (params?: ListRewardRedemptionsParams, options?: RequestInit): Promise<RewardRedemption[]> => {

  return customFetch<RewardRedemption[]>(getListRewardRedemptionsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListRewardRedemptionsQueryKey = (params?: ListRewardRedemptionsParams,) => {
    return [
    `/api/reward-redemptions`, ...(params ? [params] : [])
    ] as const;
    }


export const getListRewardRedemptionsQueryOptions = <TData = Awaited<ReturnType<typeof listRewardRedemptions>>, TError = ErrorType<unknown>>(params?: ListRewardRedemptionsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listRewardRedemptions>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListRewardRedemptionsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listRewardRedemptions>>> = ({ signal }) => listRewardRedemptions(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listRewardRedemptions>>, TError, TData> & { queryKey: QueryKey }
}

export type ListRewardRedemptionsQueryResult = NonNullable<Awaited<ReturnType<typeof listRewardRedemptions>>>
export type ListRewardRedemptionsQueryError = ErrorType<unknown>



export function useListRewardRedemptions<TData = Awaited<ReturnType<typeof listRewardRedemptions>>, TError = ErrorType<unknown>>(
 params?: ListRewardRedemptionsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listRewardRedemptions>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListRewardRedemptionsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getRedeemRewardUrl = () => {




  return `/api/reward-redemptions`
}

export const redeemReward = async (rewardRedemptionInput: RewardRedemptionInput, options?: RequestInit): Promise<RewardRedemption> => {

  return customFetch<RewardRedemption>(getRedeemRewardUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(rewardRedemptionInput)
  }
);}





export const getRedeemRewardMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof redeemReward>>, TError,{data: BodyType<RewardRedemptionInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof redeemReward>>, TError,{data: BodyType<RewardRedemptionInput>}, TContext> => {

const mutationKey = ['redeemReward'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof redeemReward>>, {data: BodyType<RewardRedemptionInput>}> = (props) => {
          const {data} = props ?? {};

          return  redeemReward(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type RedeemRewardMutationResult = NonNullable<Awaited<ReturnType<typeof redeemReward>>>
    export type RedeemRewardMutationBody = BodyType<RewardRedemptionInput>
    export type RedeemRewardMutationError = ErrorType<unknown>

    export const useRedeemReward = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof redeemReward>>, TError,{data: BodyType<RewardRedemptionInput>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof redeemReward>>,
        TError,
        {data: BodyType<RewardRedemptionInput>},
        TContext
      > => {
      return useMutation(getRedeemRewardMutationOptions(options));
    }

export const getGetLeaderboardUrl = (params?: GetLeaderboardParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/leaderboard?${stringifiedParams}` : `/api/leaderboard`
}

export const getLeaderboard = async (params?: GetLeaderboardParams, options?: RequestInit): Promise<LeaderboardEntry[]> => {

  return customFetch<LeaderboardEntry[]>(getGetLeaderboardUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetLeaderboardQueryKey = (params?: GetLeaderboardParams,) => {
    return [
    `/api/leaderboard`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetLeaderboardQueryOptions = <TData = Awaited<ReturnType<typeof getLeaderboard>>, TError = ErrorType<unknown>>(params?: GetLeaderboardParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getLeaderboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetLeaderboardQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getLeaderboard>>> = ({ signal }) => getLeaderboard(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getLeaderboard>>, TError, TData> & { queryKey: QueryKey }
}

export type GetLeaderboardQueryResult = NonNullable<Awaited<ReturnType<typeof getLeaderboard>>>
export type GetLeaderboardQueryError = ErrorType<unknown>



export function useGetLeaderboard<TData = Awaited<ReturnType<typeof getLeaderboard>>, TError = ErrorType<unknown>>(
 params?: GetLeaderboardParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getLeaderboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetLeaderboardQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getListNotificationsUrl = (params?: ListNotificationsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/notifications?${stringifiedParams}` : `/api/notifications`
}

export const listNotifications = async (params?: ListNotificationsParams, options?: RequestInit): Promise<Notification[]> => {

  return customFetch<Notification[]>(getListNotificationsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getListNotificationsQueryKey = (params?: ListNotificationsParams,) => {
    return [
    `/api/notifications`, ...(params ? [params] : [])
    ] as const;
    }


export const getListNotificationsQueryOptions = <TData = Awaited<ReturnType<typeof listNotifications>>, TError = ErrorType<unknown>>(params?: ListNotificationsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListNotificationsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof listNotifications>>> = ({ signal }) => listNotifications(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData> & { queryKey: QueryKey }
}

export type ListNotificationsQueryResult = NonNullable<Awaited<ReturnType<typeof listNotifications>>>
export type ListNotificationsQueryError = ErrorType<unknown>



export function useListNotifications<TData = Awaited<ReturnType<typeof listNotifications>>, TError = ErrorType<unknown>>(
 params?: ListNotificationsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof listNotifications>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getListNotificationsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getMarkNotificationReadUrl = (id: number,) => {




  return `/api/notifications/${id}/read`
}

export const markNotificationRead = async (id: number, options?: RequestInit): Promise<Notification> => {

  return customFetch<Notification>(getMarkNotificationReadUrl(id),
  {
    ...options,
    method: 'POST'


  }
);}





export const getMarkNotificationReadMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError,{id: number}, TContext> => {

const mutationKey = ['markNotificationRead'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof markNotificationRead>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  markNotificationRead(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type MarkNotificationReadMutationResult = NonNullable<Awaited<ReturnType<typeof markNotificationRead>>>

    export type MarkNotificationReadMutationError = ErrorType<unknown>

    export const useMarkNotificationRead = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof markNotificationRead>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof markNotificationRead>>,
        TError,
        {id: number},
        TContext
      > => {
      return useMutation(getMarkNotificationReadMutationOptions(options));
    }

export const getGetSettingsUrl = () => {




  return `/api/settings`
}

export const getSettings = async ( options?: RequestInit): Promise<PlatformSettings> => {

  return customFetch<PlatformSettings>(getGetSettingsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetSettingsQueryKey = () => {
    return [
    `/api/settings`
    ] as const;
    }


export const getGetSettingsQueryOptions = <TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSettingsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSettings>>> = ({ signal }) => getSettings({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSettingsQueryResult = NonNullable<Awaited<ReturnType<typeof getSettings>>>
export type GetSettingsQueryError = ErrorType<unknown>



export function useGetSettings<TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetSettingsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getUpdateSettingsUrl = () => {




  return `/api/settings`
}

export const updateSettings = async (platformSettingsUpdate: PlatformSettingsUpdate, options?: RequestInit): Promise<PlatformSettings> => {

  return customFetch<PlatformSettings>(getUpdateSettingsUrl(),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(platformSettingsUpdate)
  }
);}





export const getUpdateSettingsMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError,{data: BodyType<PlatformSettingsUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError,{data: BodyType<PlatformSettingsUpdate>}, TContext> => {

const mutationKey = ['updateSettings'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateSettings>>, {data: BodyType<PlatformSettingsUpdate>}> = (props) => {
          const {data} = props ?? {};

          return  updateSettings(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UpdateSettingsMutationResult = NonNullable<Awaited<ReturnType<typeof updateSettings>>>
    export type UpdateSettingsMutationBody = BodyType<PlatformSettingsUpdate>
    export type UpdateSettingsMutationError = ErrorType<unknown>

    export const useUpdateSettings = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError,{data: BodyType<PlatformSettingsUpdate>}, TContext>, request?: SecondParameter<typeof customFetch>}
 ): UseMutationResult<
        Awaited<ReturnType<typeof updateSettings>>,
        TError,
        {data: BodyType<PlatformSettingsUpdate>},
        TContext
      > => {
      return useMutation(getUpdateSettingsMutationOptions(options));
    }

export const getGetDashboardSummaryUrl = () => {




  return `/api/dashboard/summary`
}

export const getDashboardSummary = async ( options?: RequestInit): Promise<DashboardSummary> => {

  return customFetch<DashboardSummary>(getGetDashboardSummaryUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetDashboardSummaryQueryKey = () => {
    return [
    `/api/dashboard/summary`
    ] as const;
    }


export const getGetDashboardSummaryQueryOptions = <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDashboardSummaryQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDashboardSummary>>> = ({ signal }) => getDashboardSummary({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>
export type GetDashboardSummaryQueryError = ErrorType<unknown>



export function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetDashboardSummaryQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetEnvironmentalDashboardUrl = (params?: GetEnvironmentalDashboardParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/dashboard/environmental?${stringifiedParams}` : `/api/dashboard/environmental`
}

export const getEnvironmentalDashboard = async (params?: GetEnvironmentalDashboardParams, options?: RequestInit): Promise<EnvironmentalDashboard> => {

  return customFetch<EnvironmentalDashboard>(getGetEnvironmentalDashboardUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEnvironmentalDashboardQueryKey = (params?: GetEnvironmentalDashboardParams,) => {
    return [
    `/api/dashboard/environmental`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetEnvironmentalDashboardQueryOptions = <TData = Awaited<ReturnType<typeof getEnvironmentalDashboard>>, TError = ErrorType<unknown>>(params?: GetEnvironmentalDashboardParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEnvironmentalDashboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEnvironmentalDashboardQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEnvironmentalDashboard>>> = ({ signal }) => getEnvironmentalDashboard(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEnvironmentalDashboard>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEnvironmentalDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getEnvironmentalDashboard>>>
export type GetEnvironmentalDashboardQueryError = ErrorType<unknown>



export function useGetEnvironmentalDashboard<TData = Awaited<ReturnType<typeof getEnvironmentalDashboard>>, TError = ErrorType<unknown>>(
 params?: GetEnvironmentalDashboardParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEnvironmentalDashboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEnvironmentalDashboardQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetSocialDashboardUrl = () => {




  return `/api/dashboard/social`
}

export const getSocialDashboard = async ( options?: RequestInit): Promise<SocialDashboard> => {

  return customFetch<SocialDashboard>(getGetSocialDashboardUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetSocialDashboardQueryKey = () => {
    return [
    `/api/dashboard/social`
    ] as const;
    }


export const getGetSocialDashboardQueryOptions = <TData = Awaited<ReturnType<typeof getSocialDashboard>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSocialDashboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSocialDashboardQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSocialDashboard>>> = ({ signal }) => getSocialDashboard({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSocialDashboard>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSocialDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getSocialDashboard>>>
export type GetSocialDashboardQueryError = ErrorType<unknown>



export function useGetSocialDashboard<TData = Awaited<ReturnType<typeof getSocialDashboard>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSocialDashboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetSocialDashboardQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetGovernanceDashboardUrl = () => {




  return `/api/dashboard/governance`
}

export const getGovernanceDashboard = async ( options?: RequestInit): Promise<GovernanceDashboard> => {

  return customFetch<GovernanceDashboard>(getGetGovernanceDashboardUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetGovernanceDashboardQueryKey = () => {
    return [
    `/api/dashboard/governance`
    ] as const;
    }


export const getGetGovernanceDashboardQueryOptions = <TData = Awaited<ReturnType<typeof getGovernanceDashboard>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getGovernanceDashboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGovernanceDashboardQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGovernanceDashboard>>> = ({ signal }) => getGovernanceDashboard({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getGovernanceDashboard>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGovernanceDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getGovernanceDashboard>>>
export type GetGovernanceDashboardQueryError = ErrorType<unknown>



export function useGetGovernanceDashboard<TData = Awaited<ReturnType<typeof getGovernanceDashboard>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getGovernanceDashboard>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetGovernanceDashboardQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetDepartmentRankingsUrl = () => {




  return `/api/dashboard/department-rankings`
}

export const getDepartmentRankings = async ( options?: RequestInit): Promise<DepartmentRanking[]> => {

  return customFetch<DepartmentRanking[]>(getGetDepartmentRankingsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetDepartmentRankingsQueryKey = () => {
    return [
    `/api/dashboard/department-rankings`
    ] as const;
    }


export const getGetDepartmentRankingsQueryOptions = <TData = Awaited<ReturnType<typeof getDepartmentRankings>>, TError = ErrorType<unknown>>( options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDepartmentRankings>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetDepartmentRankingsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getDepartmentRankings>>> = ({ signal }) => getDepartmentRankings({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getDepartmentRankings>>, TError, TData> & { queryKey: QueryKey }
}

export type GetDepartmentRankingsQueryResult = NonNullable<Awaited<ReturnType<typeof getDepartmentRankings>>>
export type GetDepartmentRankingsQueryError = ErrorType<unknown>



export function useGetDepartmentRankings<TData = Awaited<ReturnType<typeof getDepartmentRankings>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getDepartmentRankings>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetDepartmentRankingsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetEnvironmentalReportUrl = (params?: GetEnvironmentalReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/environmental?${stringifiedParams}` : `/api/reports/environmental`
}

export const getEnvironmentalReport = async (params?: GetEnvironmentalReportParams, options?: RequestInit): Promise<EnvironmentalReport> => {

  return customFetch<EnvironmentalReport>(getGetEnvironmentalReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEnvironmentalReportQueryKey = (params?: GetEnvironmentalReportParams,) => {
    return [
    `/api/reports/environmental`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetEnvironmentalReportQueryOptions = <TData = Awaited<ReturnType<typeof getEnvironmentalReport>>, TError = ErrorType<unknown>>(params?: GetEnvironmentalReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEnvironmentalReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEnvironmentalReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEnvironmentalReport>>> = ({ signal }) => getEnvironmentalReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEnvironmentalReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEnvironmentalReportQueryResult = NonNullable<Awaited<ReturnType<typeof getEnvironmentalReport>>>
export type GetEnvironmentalReportQueryError = ErrorType<unknown>



export function useGetEnvironmentalReport<TData = Awaited<ReturnType<typeof getEnvironmentalReport>>, TError = ErrorType<unknown>>(
 params?: GetEnvironmentalReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEnvironmentalReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEnvironmentalReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetSocialReportUrl = (params?: GetSocialReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/social?${stringifiedParams}` : `/api/reports/social`
}

export const getSocialReport = async (params?: GetSocialReportParams, options?: RequestInit): Promise<SocialReport> => {

  return customFetch<SocialReport>(getGetSocialReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetSocialReportQueryKey = (params?: GetSocialReportParams,) => {
    return [
    `/api/reports/social`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetSocialReportQueryOptions = <TData = Awaited<ReturnType<typeof getSocialReport>>, TError = ErrorType<unknown>>(params?: GetSocialReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSocialReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetSocialReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getSocialReport>>> = ({ signal }) => getSocialReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getSocialReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetSocialReportQueryResult = NonNullable<Awaited<ReturnType<typeof getSocialReport>>>
export type GetSocialReportQueryError = ErrorType<unknown>



export function useGetSocialReport<TData = Awaited<ReturnType<typeof getSocialReport>>, TError = ErrorType<unknown>>(
 params?: GetSocialReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getSocialReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetSocialReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetGovernanceReportUrl = (params?: GetGovernanceReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/governance?${stringifiedParams}` : `/api/reports/governance`
}

export const getGovernanceReport = async (params?: GetGovernanceReportParams, options?: RequestInit): Promise<GovernanceReport> => {

  return customFetch<GovernanceReport>(getGetGovernanceReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetGovernanceReportQueryKey = (params?: GetGovernanceReportParams,) => {
    return [
    `/api/reports/governance`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetGovernanceReportQueryOptions = <TData = Awaited<ReturnType<typeof getGovernanceReport>>, TError = ErrorType<unknown>>(params?: GetGovernanceReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getGovernanceReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetGovernanceReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getGovernanceReport>>> = ({ signal }) => getGovernanceReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getGovernanceReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetGovernanceReportQueryResult = NonNullable<Awaited<ReturnType<typeof getGovernanceReport>>>
export type GetGovernanceReportQueryError = ErrorType<unknown>



export function useGetGovernanceReport<TData = Awaited<ReturnType<typeof getGovernanceReport>>, TError = ErrorType<unknown>>(
 params?: GetGovernanceReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getGovernanceReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetGovernanceReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







export const getGetEsgSummaryReportUrl = (params?: GetEsgSummaryReportParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/reports/esg-summary?${stringifiedParams}` : `/api/reports/esg-summary`
}

export const getEsgSummaryReport = async (params?: GetEsgSummaryReportParams, options?: RequestInit): Promise<EsgSummaryReport> => {

  return customFetch<EsgSummaryReport>(getGetEsgSummaryReportUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGetEsgSummaryReportQueryKey = (params?: GetEsgSummaryReportParams,) => {
    return [
    `/api/reports/esg-summary`, ...(params ? [params] : [])
    ] as const;
    }


export const getGetEsgSummaryReportQueryOptions = <TData = Awaited<ReturnType<typeof getEsgSummaryReport>>, TError = ErrorType<unknown>>(params?: GetEsgSummaryReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEsgSummaryReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetEsgSummaryReportQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof getEsgSummaryReport>>> = ({ signal }) => getEsgSummaryReport(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getEsgSummaryReport>>, TError, TData> & { queryKey: QueryKey }
}

export type GetEsgSummaryReportQueryResult = NonNullable<Awaited<ReturnType<typeof getEsgSummaryReport>>>
export type GetEsgSummaryReportQueryError = ErrorType<unknown>



export function useGetEsgSummaryReport<TData = Awaited<ReturnType<typeof getEsgSummaryReport>>, TError = ErrorType<unknown>>(
 params?: GetEsgSummaryReportParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getEsgSummaryReport>>, TError, TData>, request?: SecondParameter<typeof customFetch>}

 ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getGetEsgSummaryReportQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  return withQueryKey(query, queryOptions.queryKey);
}







