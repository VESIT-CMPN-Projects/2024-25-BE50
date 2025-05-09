USE [expense_tracker]
GO
/****** Object:  Table [dbo].[expense]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[expense](
	[expense_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[category_id] [int] NOT NULL,
	[expense_name] [varchar](255) NOT NULL,
	[expense_description] [nvarchar](max) NULL,
	[expense_amount] [int] NOT NULL,
	[expense_date] [date] NULL,
	[created_at] [datetime] NULL,
	[edited_at] [datetime] NULL,
	[active_yn] [int] NOT NULL,
	[slug] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[expense_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[expense] ADD  DEFAULT (getdate()) FOR [expense_date]
GO
ALTER TABLE [dbo].[expense] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[expense] ADD  DEFAULT (getdate()) FOR [edited_at]
GO
ALTER TABLE [dbo].[expense] ADD  DEFAULT ((1)) FOR [active_yn]
GO
ALTER TABLE [dbo].[expense]  WITH CHECK ADD  CONSTRAINT [FK_expense_category] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[expense] CHECK CONSTRAINT [FK_expense_category]
GO
ALTER TABLE [dbo].[expense]  WITH CHECK ADD  CONSTRAINT [FK_expense_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[expense] CHECK CONSTRAINT [FK_expense_users]
GO
