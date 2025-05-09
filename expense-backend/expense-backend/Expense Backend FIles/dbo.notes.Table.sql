USE [expense_tracker]
GO
/****** Object:  Table [dbo].[notes]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notes](
	[note_id] [int] IDENTITY(1,1) NOT NULL,
	[note_title] [varchar](150) NULL,
	[note_description] [nvarchar](max) NULL,
	[published_at] [date] NULL,
	[edited_at] [date] NULL,
	[is_active_yn] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[note_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[notes] ADD  DEFAULT (getdate()) FOR [published_at]
GO
ALTER TABLE [dbo].[notes] ADD  DEFAULT (getdate()) FOR [edited_at]
GO
ALTER TABLE [dbo].[notes] ADD  DEFAULT ((1)) FOR [is_active_yn]
GO
