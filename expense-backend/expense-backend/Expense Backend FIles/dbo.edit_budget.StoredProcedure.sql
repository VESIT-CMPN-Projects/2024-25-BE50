USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[edit_budget]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[edit_budget]
@budget_name VARCHAR(255),
@budget_description NVARCHAR(MAX),
@target_amount INT,
@date_to_achieve DATE,
@category_id INT,
@slug NVARCHAR(MAX)
AS
BEGIN
    DECLARE @new_slug NVARCHAR(MAX);
    SET @new_slug = CONCAT(@budget_name, '_', NEWID());
	UPDATE BUDGET
	SET budget_name=@budget_name,
	budget_description=@budget_description,
	target_amount=@target_amount,
	date_to_achieve=@date_to_achieve,
	edited_at= GETDATE(),
	slug=LOWER(@new_slug),
	category_id=@category_id
    WHERE
	slug=@slug
END;


GO
