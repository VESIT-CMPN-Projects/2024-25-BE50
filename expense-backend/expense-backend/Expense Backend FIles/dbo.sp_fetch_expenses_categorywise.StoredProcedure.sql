USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_fetch_expenses_categorywise]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_fetch_expenses_categorywise]
@user_id int
AS
BEGIN
	DROP TABLE  if exists #temptable
	SELECT et.expense_id,
    STRING_AGG(t.[tag_name], ', ') AS tags
	INTO #temptable
	FROM expense_tags et 
	INNER JOIN tags t 
	ON et.tag_id = t.tag_id
	GROUP BY et.expense_id

	SELECT 
	sum(e.expense_amount) as total_sum,
	c.category_name
	FROM 
	dbo.users u INNER JOIN expense e on u.user_id = e.user_id INNER JOIN category c 
	on c.category_id=e.category_id
	LEFT join #temptable t on  t.expense_id = e.expense_id
	where e.user_id = @user_id and e.active_yn=1 group by c.category_name ;
END

GO
