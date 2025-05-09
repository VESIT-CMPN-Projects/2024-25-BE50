USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_register_user]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- sp add user


CREATE  PROCEDURE [dbo].[sp_register_user]
@username VARCHAR(100),
@fullname VARCHAR(255),
@password NVARCHAR(MAX),
@income_id INT,
@date_of_birth DATE,
@email VARCHAR(200),
@phone_number VARCHAR(20)
AS
BEGIN
    DECLARE @converted_password VARBINARY(MAX) = CONVERT(VARBINARY(MAX), HashBytes('SHA2_256', @password))
    
    INSERT INTO dbo.users
    (username, password, email, fullname, income_id, date_of_birth, phone_number) 
    VALUES
    (@username, @converted_password, @email, @fullname, @income_id, @date_of_birth, @phone_number)
END
GO
