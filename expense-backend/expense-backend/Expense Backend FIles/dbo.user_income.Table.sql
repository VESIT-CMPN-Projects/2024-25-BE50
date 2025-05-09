USE [expense_tracker]
GO
/****** Object:  Table [dbo].[user_income]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_income](
	[user_income_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[AMOUNT] [int] NULL,
	[INCOME_TYPE] [int] NULL,
	[income_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_income_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[user_income] ADD  DEFAULT ((0)) FOR [AMOUNT]
GO
ALTER TABLE [dbo].[user_income] ADD  DEFAULT (getdate()) FOR [income_date]
GO
ALTER TABLE [dbo].[user_income]  WITH CHECK ADD FOREIGN KEY([INCOME_TYPE])
REFERENCES [dbo].[income_type] ([income_type_id])
GO
ALTER TABLE [dbo].[user_income]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
