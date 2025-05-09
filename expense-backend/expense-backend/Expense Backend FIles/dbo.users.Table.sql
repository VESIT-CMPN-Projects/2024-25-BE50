USE [expense_tracker]
GO
/****** Object:  Table [dbo].[users]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[fullname] [varchar](255) NOT NULL,
	[username] [varchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[income_id] [int] NOT NULL,
	[phone_number] [varchar](255) NOT NULL,
	[password] [varbinary](max) NOT NULL,
	[created_at] [datetime] NULL,
	[edited_at] [datetime] NULL,
	[active_yn] [int] NOT NULL,
	[date_of_birth] [date] NOT NULL,
	[token] [varchar](max) NULL,
	[time_to_expire] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (getdate()) FOR [edited_at]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((1)) FOR [active_yn]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (getdate()) FOR [time_to_expire]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_income] FOREIGN KEY([income_id])
REFERENCES [dbo].[income_type] ([income_type_id])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_income]
GO
