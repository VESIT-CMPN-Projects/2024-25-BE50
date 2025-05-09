USE [expense_tracker]
GO
/****** Object:  Table [dbo].[budget]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budget](
	[budget_id] [int] IDENTITY(1,1) NOT NULL,
	[budget_name] [varchar](255) NOT NULL,
	[user_id] [int] NOT NULL,
	[budget_description] [nvarchar](max) NULL,
	[target_amount] [int] NULL,
	[date_to_achieve] [date] NULL,
	[created_at] [datetime] NULL,
	[edited_at] [datetime] NULL,
	[active_yn] [int] NOT NULL,
	[slug] [nvarchar](max) NULL,
	[target_achieved] [int] NULL,
	[category_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[budget_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[budget] ADD  DEFAULT ((0)) FOR [target_amount]
GO
ALTER TABLE [dbo].[budget] ADD  DEFAULT (getdate()) FOR [date_to_achieve]
GO
ALTER TABLE [dbo].[budget] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[budget] ADD  DEFAULT (getdate()) FOR [edited_at]
GO
ALTER TABLE [dbo].[budget]  WITH CHECK ADD  CONSTRAINT [FK_budget_category] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[budget] CHECK CONSTRAINT [FK_budget_category]
GO
ALTER TABLE [dbo].[budget]  WITH CHECK ADD  CONSTRAINT [FK_budget_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[budget] CHECK CONSTRAINT [FK_budget_users]
GO
