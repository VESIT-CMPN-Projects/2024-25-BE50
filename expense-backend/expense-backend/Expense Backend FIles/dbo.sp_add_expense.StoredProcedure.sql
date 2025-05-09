USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_add_expense]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[sp_add_expense]
   @expense_name VARCHAR(500),
   @expense_amount DECIMAL(18, 2),
   @expense_description NVARCHAR(MAX),
   @expense_date DATE,
   @category_id INT,
   @tags NVARCHAR(MAX),
   @user_id INT
AS
BEGIN
    DECLARE @expense_id INT
    DECLARE @slug VARCHAR(500) = CONCAT(REPLACE(@expense_name, ' ', '-'), NEWID())

    -- Inserting into expenses table
    INSERT INTO expense (expense_name, expense_amount, expense_description, expense_date, category_id, slug , user_id)
    VALUES (@expense_name, @expense_amount, @expense_description, @expense_date, @category_id, @slug , @user_id)

    -- Retrieving the inserted expense_id
    SET @expense_id = SCOPE_IDENTITY()

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
    INSERT INTO expense_tags (expense_id, tag_id)
    SELECT @expense_id, t.tag_id
    FROM tags t
    INNER JOIN #temptable tt ON t.tag_name = tt.tag_name

    -- Optional: Selecting and returning data for validation
    SELECT * FROM expense WHERE expense_id = @expense_id
    SELECT * FROM expense_tags WHERE expense_id = @expense_id
    SELECT * FROM tags
END
GO
