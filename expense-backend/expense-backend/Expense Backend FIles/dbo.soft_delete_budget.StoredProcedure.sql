USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[soft_delete_budget]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[soft_delete_budget]
@slug NVARCHAR(MAX)
AS
BEGIN
    UPDATE dbo.Budget
    SET active_yn = 0
    WHERE slug=@slug
END
GO
