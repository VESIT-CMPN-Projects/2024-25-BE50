USE [expense_tracker]
GO
/****** Object:  Table [dbo].[BUDGET_TRACKING]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BUDGET_TRACKING](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[budget_id] [int] NOT NULL,
	[user_id] [int] NOT NULL,
	[updated_date] [date] NULL,
	[updated_amount] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BUDGET_TRACKING] ADD  DEFAULT (getdate()) FOR [updated_date]
GO
ALTER TABLE [dbo].[BUDGET_TRACKING]  WITH CHECK ADD  CONSTRAINT [FK_budget_tracking_budget] FOREIGN KEY([budget_id])
REFERENCES [dbo].[budget] ([budget_id])
GO
ALTER TABLE [dbo].[BUDGET_TRACKING] CHECK CONSTRAINT [FK_budget_tracking_budget]
GO
ALTER TABLE [dbo].[BUDGET_TRACKING]  WITH CHECK ADD  CONSTRAINT [FK_budget_tracking_user] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[BUDGET_TRACKING] CHECK CONSTRAINT [FK_budget_tracking_user]
GO
