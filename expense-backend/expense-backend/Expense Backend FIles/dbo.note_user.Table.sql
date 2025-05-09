USE [expense_tracker]
GO
/****** Object:  Table [dbo].[note_user]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[note_user](
	[note_user_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[note_id] [int] NULL,
	[is_active_yn] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[note_user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[note_user] ADD  DEFAULT ((1)) FOR [is_active_yn]
GO
ALTER TABLE [dbo].[note_user]  WITH CHECK ADD FOREIGN KEY([note_id])
REFERENCES [dbo].[notes] ([note_id])
GO
ALTER TABLE [dbo].[note_user]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
