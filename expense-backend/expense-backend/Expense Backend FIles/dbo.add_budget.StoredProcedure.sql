USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[add_budget]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[add_budget]
    @budget_name VARCHAR(255),
    @user_id INT,
    @budget_description NVARCHAR(MAX),
    @target_amount INT,
    @date_to_achieve DATE,
    @category_id INT,
	@tags VARCHAR(255)
AS
BEGIN
    DECLARE @new_slug NVARCHAR(MAX);
	DECLARE @budget_id INT
    SET @new_slug = CONCAT(@budget_name, '_', NEWID());

    INSERT INTO BUDGET (budget_name, user_id, budget_description, target_amount, date_to_achieve, created_at, edited_at, active_yn, slug, category_id,target_achieved)
    VALUES (@budget_name, @user_id, @budget_description, @target_amount, @date_to_achieve, GETDATE(), GETDATE(), 1, LOWER(@new_slug), @category_id,0);

	  SET @budget_id = SCOPE_IDENTITY()

    -- Temporary table to store tags
    DROP TABLE IF EXISTS #temptable
    CREATE TABLE #temptable (tag_name VARCHAR(100))

    -- Splitting tags and inserting into the temporary table
    INSERT INTO #temptable (tag_name)
    SELECT value
    FROM STRING_SPLIT(@tags, ',')

    -- Inserting unique tags into tags table
    INSERT INTO tags (tag_name)
    SELECT tag_name
    FROM #temptable t
    WHERE NOT EXISTS (
        SELECT 1
        FROM tags
        WHERE tag_name = t.tag_name
    )

    -- Inserting into expense_tag table
    INSERT INTO budget_tags(budget_id, tag_id)
    SELECT @budget_id, t.tag_id
    FROM tags t
    INNER JOIN #temptable tt ON t.tag_name = tt.tag_name

	INSERT INTO BUDGET_TRACKING (budget_id , user_id , updated_date , updated_amount)
	VALUES (@budget_id,@user_id,GETDATE(),0)
END;
GO
