USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[view_budget]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     PROCEDURE [dbo].[view_budget]
@user_id INT
AS
BEGIN
DROP TABLE  if exists #temptable
	SELECT et.budget_id,
    STRING_AGG(t.[tag_name], ', ') AS tags
	INTO #temptable
	FROM budget_tags et 
	INNER JOIN tags t 
	ON et.tag_id = t.tag_id
	GROUP BY et.budget_id

	SELECT B.budget_name,B.budget_description,
	B.target_amount,B.date_to_achieve,   (CAST(B.target_achieved AS DECIMAL(10,2)) / B.target_amount * 100) AS percent_achieved,
	B.created_at,B.edited_at,B.slug,B.target_achieved,C.category_name,t.tags
	FROM BUDGET AS B 
	INNER JOIN
	category AS C
	ON 
	B.category_id=C.category_id LEFT join #temptable t on t.budget_id =b.budget_id
	WHERE B.user_id=@user_id
	AND
	B.active_yn=1
END
GO
