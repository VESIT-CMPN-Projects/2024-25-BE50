USE [expense_tracker]
GO
/****** Object:  Table [dbo].[budget_tags]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[budget_tags](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[budget_id] [int] NOT NULL,
	[tag_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[budget_tags]  WITH CHECK ADD  CONSTRAINT [FK_budget_tags_budget] FOREIGN KEY([budget_id])
REFERENCES [dbo].[budget] ([budget_id])
GO
ALTER TABLE [dbo].[budget_tags] CHECK CONSTRAINT [FK_budget_tags_budget]
GO
ALTER TABLE [dbo].[budget_tags]  WITH CHECK ADD  CONSTRAINT [FK_budget_tags_tags] FOREIGN KEY([tag_id])
REFERENCES [dbo].[tags] ([tag_id])
GO
ALTER TABLE [dbo].[budget_tags] CHECK CONSTRAINT [FK_budget_tags_tags]
GO
