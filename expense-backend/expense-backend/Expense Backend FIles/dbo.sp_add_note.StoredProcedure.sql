USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_add_note]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     PROCEDURE [dbo].[sp_add_note]
@user_id INT,
@note_title VARCHAR(150),
@note_description NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.notes  (note_title,note_description) VALUES (@note_title,@note_description)
	DECLARE @note_id INT =  @@IDENTITY 
	INSERT INTO DBO.note_user (note_id,user_id) VALUES(@note_id,@user_id);
END
GO
