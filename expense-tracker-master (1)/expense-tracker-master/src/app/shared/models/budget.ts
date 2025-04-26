// [budget_id]
//       ,[budget_name]
//       ,[user_id]
//       ,[budget_description]
//       ,[target_amount]
//       ,[date_to_achieve]
//       ,[created_at]
//       ,[edited_at]
//       ,[active_yn]
//       ,[slug]
//       ,[target_achieved]
//       ,[category_id]
export class Budget {
  budget_id: number | undefined;
  budget_name: string | undefined;
  user_id: number | undefined;
  budget_description: string | undefined;
  target_amount: number | undefined;
  date_to_achieve: string | undefined;
  created_at: string | undefined;
  edited_at: string | undefined;
  active_yn: string | undefined;
  slug: string | undefined;
  target_achieved: number | undefined;
  category_id: number | undefined;
}