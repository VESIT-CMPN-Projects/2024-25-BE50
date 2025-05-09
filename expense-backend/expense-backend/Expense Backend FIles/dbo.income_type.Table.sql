USE [expense_tracker]
GO
/****** Object:  Table [dbo].[income_type]    Script Date: 09-06-2024 22:15:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[income_type](
	[income_type_id] [int] IDENTITY(1,1) NOT NULL,
	[income_type_name] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[income_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
