USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_validate_token]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_validate_token]
@user_id INT,
@token VARCHAR(MAX)
AS
BEGIN
	DECLARE @count INT
	SELECT @count = COUNT(1) FROM dbo.users where 
	user_id = @user_id and token = @token  and time_to_expire > GETDATE()
	IF (@count = 1)
		BEGIN
			SELECT user_id , 1 as validYN , username , token 
			FROM dbo.users where 
	user_id = @user_id 
		END
	ELSE
		BEGIN
			SELECT 0 as validYN FROM dbo.users  where 
	user_id = @user_id 
		END
END
GO
