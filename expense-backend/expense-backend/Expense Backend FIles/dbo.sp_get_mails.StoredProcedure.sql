USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_get_mails]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_get_mails]
AS
BEgin
SELECT email from dbo.users
end
GO
