USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_get_phone_number]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   procedure [dbo].[sp_get_phone_number]
AS
BEgin
SELECT user_id ,  phone_number from dbo.users
end
GO
