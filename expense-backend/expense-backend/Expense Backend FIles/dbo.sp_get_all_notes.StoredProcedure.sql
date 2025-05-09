USE [expense_tracker]
GO
/****** Object:  StoredProcedure [dbo].[sp_get_all_notes]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE   PROCEDURE [dbo].[sp_get_all_notes]
@user_id INT
AS
	BEGIN
			SELECT n.note_id, note_title,note_description,u.username,n.edited_at
			FROM 
			dbo.notes n JOIN dbo.note_user nu ON n.note_id = nu.note_id 
			JOIN dbo.users u ON u.user_id = nu.user_id
			WHERE u.user_id = @user_id 
	END
GO
