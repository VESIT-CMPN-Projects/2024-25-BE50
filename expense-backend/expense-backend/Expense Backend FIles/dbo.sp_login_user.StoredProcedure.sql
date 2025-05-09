USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_login_user]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE               PROCEDURE [dbo].[sp_login_user]
    @username VARCHAR(255),
    @password NVARCHAR(MAX)
AS
BEGIN
    DECLARE @hashedPassword VARBINARY(MAX)
	DECLARE @count INT
    SET @hashedPassword = HashBytes('SHA2_256', @password)
            SELECT @count = COUNT(1)
            FROM dbo.users
            WHERE username = @username
                AND password = @hashedPassword 
    IF @count = 1
    BEGIN
	UPDATE dbo.users 
	SET token = NEWID(),
	time_to_expire =  DATEADD(MI, 30, GETDATE())
	where username = @username
	
        SELECT 1 as validYN,username,user_id,
               fullname
               ,password, token , time_to_expire
        FROM dbo.users
        WHERE username = @username
        AND password = @hashedPassword;
        
    END
    ELSE
    BEGIN
        SELECT 0 as validYN;
    END
END

GO
