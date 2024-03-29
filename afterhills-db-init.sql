/****** Object:  Database [afterhills]    Script Date: 5/31/2022 11:06:24 AM ******/
CREATE DATABASE [afterhills]
GO

USE [afterhills]
GO

/****** Object:  Table [dbo].[__Logs]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__Logs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Message] [nvarchar](max) NULL,
	[Level] [nvarchar](128) NULL,
	[TimeStamp] [datetime] NOT NULL,
	[Exception] [nvarchar](max) NULL,
	[LogEvent] [nvarchar](max) NULL,
	[CorrelationId] [uniqueidentifier] NULL,
 CONSTRAINT [PK___Logs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conference]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conference](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ConferenceTypeId] [int] NOT NULL,
	[LocationId] [int] NOT NULL,
	[OrganizerEmail] [nvarchar](50) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
 CONSTRAINT [PK_Conference] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConferenceXAttendee]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConferenceXAttendee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AttendeeEmail] [nvarchar](50) NOT NULL,
	[ConferenceId] [int] NOT NULL,
	[StatusId] [int] NOT NULL,
 CONSTRAINT [PK_ConferenceXAttendee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConferenceXSpeaker]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConferenceXSpeaker](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ConferenceId] [int] NOT NULL,
	[SpeakerId] [int] NOT NULL,
	[IsMainSpeaker] [bit] NULL,
 CONSTRAINT [PK_ConferenceXSpeaker] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictionaryCategory]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictionaryCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictionaryCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictionaryCity]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictionaryCity](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictionaryCity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictionaryConferenceType]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictionaryConferenceType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictionaryConferenceType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictionaryCountry]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictionaryCountry](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictionaryCountry] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictionaryCounty]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictionaryCounty](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictionaryCounty] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DictionaryStatus]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DictionaryStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_DictionaryStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Code] [nvarchar](50) NULL,
	[CountryId] [int] NOT NULL,
	[Address] [nvarchar](255) NULL,
	[CountyId] [int] NOT NULL,
	[CityId] [int] NOT NULL,
	[Latitude] [decimal](12, 9) NULL,
	[Longitude] [decimal](12, 9) NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Speaker]    Script Date: 5/31/2022 11:06:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Speaker](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Nationality] [nvarchar](50) NULL,
	[Rating] [decimal](5, 2) NULL,
	[Image] [image] NULL,
 CONSTRAINT [PK_Speaker] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[Conference] ON 

INSERT [dbo].[Conference] ([Id], [ConferenceTypeId], [LocationId], [OrganizerEmail], [CategoryId], [StartDate], [EndDate], [Name]) VALUES (1, 1, 1, N'admin@totalsoft.ro', 1, CAST(N'2022-10-21' AS Date), CAST(N'2022-10-23' AS Date), N'Introduction to GraphQL')
INSERT [dbo].[Conference] ([Id], [ConferenceTypeId], [LocationId], [OrganizerEmail], [CategoryId], [StartDate], [EndDate], [Name]) VALUES (2, 1, 1, N'admin@totalsoft.ro', 1, CAST(N'2022-10-21' AS Date), CAST(N'2022-10-23' AS Date), N'Introduction to GraphQL')
INSERT [dbo].[Conference] ([Id], [ConferenceTypeId], [LocationId], [OrganizerEmail], [CategoryId], [StartDate], [EndDate], [Name]) VALUES (3, 1, 1, N'admin@totalsoft.ro', 1, CAST(N'2022-09-09' AS Date), CAST(N'2022-09-11' AS Date), N'Introduction to GraphQL')
INSERT [dbo].[Conference] ([Id], [ConferenceTypeId], [LocationId], [OrganizerEmail], [CategoryId], [StartDate], [EndDate], [Name]) VALUES (4, 2, 2, N'admin@totalsoft.ro', 1, CAST(N'2022-09-07' AS Date), CAST(N'2022-09-09' AS Date), N'Introduction to React')
SET IDENTITY_INSERT [dbo].[Conference] OFF
GO
SET IDENTITY_INSERT [dbo].[ConferenceXSpeaker] ON 

INSERT [dbo].[ConferenceXSpeaker] ([Id], [ConferenceId], [SpeakerId], [IsMainSpeaker]) VALUES (1, 1, 1, 1)
INSERT [dbo].[ConferenceXSpeaker] ([Id], [ConferenceId], [SpeakerId], [IsMainSpeaker]) VALUES (2, 4, 2, 1)
SET IDENTITY_INSERT [dbo].[ConferenceXSpeaker] OFF
GO
SET IDENTITY_INSERT [dbo].[DictionaryCategory] ON 

INSERT [dbo].[DictionaryCategory] ([Id], [Name], [Code]) VALUES (1, N'IT Software', N'it')
SET IDENTITY_INSERT [dbo].[DictionaryCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[DictionaryCity] ON 

INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (1, N'Razboieni', N'Razboieni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (2, N'Alexandru I. Cuza', N'Alexandru I. Cuza')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (3, N'Kogalniceni', N'Kogalniceni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (4, N'Scheia', N'Scheia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (5, N'Volintire?ti', N'Volintire?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (6, N'Andrie?eni', N'Andrie?eni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (7, N'Buhaeni', N'Buhaeni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (8, N'Dragane?ti', N'Dragane?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (9, N'Fântânele', N'Fântânele')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (10, N'Glavane?ti', N'Glavane?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (11, N'Iepureni', N'Iepureni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (12, N'Spineni', N'Spineni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (13, N'Aroneanu', N'Aroneanu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (14, N'Doroban?', N'Doroban?')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (15, N'Rediu Aldei', N'Rediu Aldei')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (16, N'?orogani', N'?orogani')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (17, N'Bal?a?i', N'Bal?a?i')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (18, N'Cotârgaci', N'Cotârgaci')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (19, N'Filia?i', N'Filia?i')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (20, N'Madârje?ti', N'Madârje?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (21, N'Podi?u', N'Podi?u')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (22, N'Sârca', N'Sârca')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (23, N'Valea Oilor', N'Valea Oilor')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (24, N'Belce?ti', N'Belce?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (25, N'Liteni', N'Liteni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (26, N'Munteni', N'Munteni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (27, N'Satu Nou', N'Satu Nou')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (28, N'Tansa', N'Tansa')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (29, N'Ulmi', N'Ulmi')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (30, N'Bivolari', N'Bivolari')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (31, N'Buruiene?ti', N'Buruiene?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (32, N'Solone?', N'Solone?')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (33, N'Tabara', N'Tabara')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (34, N'Traian', N'Traian')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (35, N'Bosia', N'Bosia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (36, N'Coada Stâncii', N'Coada Stâncii')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (37, N'Mânzate?ti', N'Mânzate?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (38, N'Ungheni', N'Ungheni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (39, N'Brae?ti', N'Brae?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (40, N'Albe?ti', N'Albe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (41, N'Buda', N'Buda')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (42, N'Criste?ti', N'Criste?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (43, N'Rediu', N'Rediu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (44, N'Butea', N'Butea')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (45, N'Miclau?eni', N'Miclau?eni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (46, N'Cepleni?a', N'Cepleni?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (47, N'Buhalni?a', N'Buhalni?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (48, N'Poiana Marului', N'Poiana Marului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (49, N'Zlodica', N'Zlodica')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (50, N'Ciorte?ti', N'Ciorte?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (51, N'Coropceni', N'Coropceni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (52, N'Deleni', N'Deleni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (53, N'Rotaria', N'Rotaria')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (54, N'?erbe?ti', N'?erbe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (55, N'Ciurea', N'Ciurea')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (56, N'Curaturi', N'Curaturi')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (57, N'Dumbrava', N'Dumbrava')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (58, N'Hlincea', N'Hlincea')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (59, N'Lunca Ceta?uii', N'Lunca Ceta?uii')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (60, N'Picioru Lupului', N'Picioru Lupului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (61, N'Slobozia', N'Slobozia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (62, N'Coarnele Caprei', N'Coarnele Caprei')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (63, N'Arama', N'Arama')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (64, N'Petro?ica', N'Petro?ica')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (65, N'Osoi', N'Osoi')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (66, N'Comarna', N'Comarna')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (67, N'Curagau', N'Curagau')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (68, N'Stânca', N'Stânca')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (69, N'Costuleni', N'Costuleni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (70, N'Covasna', N'Covasna')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (71, N'Cozia', N'Cozia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (72, N'Hili?a', N'Hili?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (73, N'Cotnari', N'Cotnari')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (74, N'Bahluiu', N'Bahluiu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (75, N'Cire?eni', N'Cire?eni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (76, N'Cârjoaia', N'Cârjoaia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (77, N'Fagat', N'Fagat')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (78, N'Hodora', N'Hodora')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (79, N'Horodi?tea', N'Horodi?tea')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (80, N'Iosupeni', N'Iosupeni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (81, N'Luparia', N'Luparia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (82, N'Valea Racului', N'Valea Racului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (83, N'Zbereni', N'Zbereni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (84, N'Cozme?ti', N'Cozme?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (85, N'Podolenii de Jos', N'Podolenii de Jos')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (86, N'Podolenii de Sus', N'Podolenii de Sus')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (87, N'Criste?ti', N'Criste?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (88, N'Homi?a', N'Homi?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (89, N'Cucuteni', N'Cucuteni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (90, N'Baiceni', N'Baiceni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (91, N'Barbate?ti', N'Barbate?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (92, N'Sacare?ti', N'Sacare?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (93, N'Dagâ?a', N'Dagâ?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (94, N'Balu?e?ti', N'Balu?e?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (95, N'Boatca', N'Boatca')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (96, N'Buzdug', N'Buzdug')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (97, N'Manastirea', N'Manastirea')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (98, N'Piscu Rusului', N'Piscu Rusului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (99, N'Poienile', N'Poienile')
GO
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (100, N'Tarni?a', N'Tarni?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (101, N'Zece Prajini', N'Zece Prajini')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (102, N'Deleni', N'Deleni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (103, N'Feredeni', N'Feredeni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (104, N'Leahu-Nacu', N'Leahu-Nacu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (105, N'Maxut', N'Maxut')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (106, N'Poiana', N'Poiana')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (107, N'Slobozia', N'Slobozia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (108, N'Dobrova?', N'Dobrova?')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (109, N'Dolhe?ti', N'Dolhe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (110, N'Bradice?ti', N'Bradice?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (111, N'Pietri?', N'Pietri?')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (112, N'Dume?ti', N'Dume?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (113, N'Banu', N'Banu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (114, N'Chili?oaia', N'Chili?oaia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (115, N'Hoise?ti', N'Hoise?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (116, N'Pau?e?ti', N'Pau?e?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (117, N'Erbiceni', N'Erbiceni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (118, N'Bârle?ti', N'Bârle?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (119, N'Spinoasa', N'Spinoasa')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (120, N'Sprânceana', N'Sprânceana')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (121, N'Totoe?ti', N'Totoe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (122, N'Focuri', N'Focuri')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (123, N'Fântânele', N'Fântânele')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (124, N'Golaie?ti', N'Golaie?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (125, N'Bran', N'Bran')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (126, N'Cilibiu', N'Cilibiu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (127, N'Cotu lui Ivan', N'Cotu lui Ivan')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (128, N'Gradinari', N'Gradinari')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (129, N'Medeleni', N'Medeleni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (130, N'Petre?ti', N'Petre?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (131, N'Podu Jijiei', N'Podu Jijiei')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (132, N'Gorban', N'Gorban')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (133, N'Gura Bohotin', N'Gura Bohotin')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (134, N'Podu Hagiului', N'Podu Hagiului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (135, N'Scoposeni', N'Scoposeni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (136, N'Zberoaia', N'Zberoaia')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (137, N'Grajduri', N'Grajduri')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (138, N'Carbunari', N'Carbunari')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (139, N'Corcodel', N'Corcodel')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (140, N'Lunca', N'Lunca')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (141, N'Padureni', N'Padureni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (142, N'Poiana cu Cetate', N'Poiana cu Cetate')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (143, N'Valea Satului', N'Valea Satului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (144, N'Gropni?a', N'Gropni?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (145, N'Bulbucani', N'Bulbucani')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (146, N'Fora?ti', N'Fora?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (147, N'Malae?ti', N'Malae?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (148, N'Saveni', N'Saveni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (149, N'Sângeri', N'Sângeri')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (150, N'Groze?ti', N'Groze?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (151, N'Col?u Cornii', N'Col?u Cornii')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (152, N'Salageni', N'Salageni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (153, N'Halauce?ti', N'Halauce?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (154, N'Lunca?i', N'Lunca?i')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (155, N'Hele?teni', N'Hele?teni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (156, N'Harmaneasa', N'Harmaneasa')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (157, N'Movileni', N'Movileni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (158, N'Oboroceni', N'Oboroceni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (159, N'Horle?ti', N'Horle?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (160, N'Bogdane?ti', N'Bogdane?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (161, N'Scoposeni', N'Scoposeni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (162, N'Ipatele', N'Ipatele')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (163, N'Alexe?ti', N'Alexe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (164, N'Bâcu', N'Bâcu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (165, N'Cuza Voda', N'Cuza Voda')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (166, N'Lespezi', N'Lespezi')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (167, N'Buda', N'Buda')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (168, N'Bursuc-Deal', N'Bursuc-Deal')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (169, N'Bursuc-Vale', N'Bursuc-Vale')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (170, N'Dumbrava', N'Dumbrava')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (171, N'Heci', N'Heci')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (172, N'Le?cani', N'Le?cani')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (173, N'Bogonos', N'Bogonos')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (174, N'Cogeasca', N'Cogeasca')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (175, N'Cucuteni', N'Cucuteni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (176, N'Lungani', N'Lungani')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (177, N'Crucea', N'Crucea')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (178, N'Goe?ti', N'Goe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (179, N'Zmeu', N'Zmeu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (180, N'Madârjac', N'Madârjac')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (181, N'Bojila', N'Bojila')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (182, N'Frumu?ica', N'Frumu?ica')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (183, N'Mirce?ti', N'Mirce?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (184, N'Iugani', N'Iugani')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (185, N'Izvoarele', N'Izvoarele')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (186, N'Rachiteni', N'Rachiteni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (187, N'Ursare?ti', N'Ursare?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (188, N'Mironeasa', N'Mironeasa')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (189, N'Schitu Hadâmbului', N'Schitu Hadâmbului')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (190, N'Ur?i?a', N'Ur?i?a')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (191, N'Miroslava', N'Miroslava')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (192, N'Balciu', N'Balciu')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (193, N'Bratuleni', N'Bratuleni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (194, N'Ciurbe?ti', N'Ciurbe?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (195, N'Corne?ti', N'Corne?ti')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (196, N'Danca?', N'Danca?')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (197, N'Gaureni', N'Gaureni')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (198, N'Horpaz', N'Horpaz')
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (199, N'Proselnici', N'Proselnici')
GO
INSERT [dbo].[DictionaryCity] ([Id], [Name], [Code]) VALUES (200, N'Uricani', N'Uricani')
SET IDENTITY_INSERT [dbo].[DictionaryCity] OFF
GO
SET IDENTITY_INSERT [dbo].[DictionaryConferenceType] ON 

INSERT [dbo].[DictionaryConferenceType] ([Id], [Name], [Code]) VALUES (1, N'Remote', N'rm')
INSERT [dbo].[DictionaryConferenceType] ([Id], [Name], [Code]) VALUES (2, N'OnSite', N'os')
SET IDENTITY_INSERT [dbo].[DictionaryConferenceType] OFF
GO
SET IDENTITY_INSERT [dbo].[DictionaryCountry] ON 

INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (1, N'AFGHANISTAN', N'AF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (2, N'ALBANIA', N'AL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (3, N'ALGERIA', N'DZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (4, N'AMERICAN SAMOA', N'AS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (5, N'ANDORRA', N'AD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (6, N'ANGOLA', N'AO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (7, N'ANGUILLA', N'AI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (8, N'ANTARCTICA', N'AQ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (9, N'ANTIGUA AND BARBUDA', N'AG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (10, N'ARGENTINA', N'AR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (11, N'ARMENIA', N'AM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (12, N'ARUBA', N'AW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (13, N'AUSTRALIA', N'AU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (14, N'AUSTRIA', N'AT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (15, N'AZERBAIJAN', N'AZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (16, N'BAHAMAS', N'BS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (17, N'BAHRAIN', N'BH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (18, N'BANGLADESH', N'BD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (19, N'BARBADOS', N'BB')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (20, N'BELARUS', N'BY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (21, N'BELGIUM', N'BE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (22, N'BELIZE', N'BZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (23, N'BENIN', N'BJ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (24, N'BERMUDA', N'BM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (25, N'BHUTAN', N'BT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (26, N'BOLIVIA', N'BO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (27, N'BOSNIA AND HERZEGOVINA', N'BA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (28, N'BOTSWANA', N'BW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (29, N'BOUVET ISLAND', N'BV')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (30, N'BRAZIL', N'BR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (31, N'BRITISH INDIAN OCEAN TERRITORY', N'IO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (32, N'BRUNEI DARUSSALAM', N'BN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (33, N'BULGARIA', N'BG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (34, N'BURKINA FASO', N'BF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (35, N'BURUNDI', N'BI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (36, N'CAMBODIA', N'KH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (37, N'CAMEROON', N'CM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (38, N'CANADA', N'CA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (39, N'CAPE VERDE', N'CV')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (40, N'CAYMAN ISLANDS', N'KY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (41, N'CENTRAL AFRICAN REPUBLIC', N'CF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (42, N'CHAD', N'TD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (43, N'CHILE', N'CL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (44, N'CHINA', N'CN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (45, N'CHRISTMAS ISLAND', N'CX')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (46, N'COCOS (KEELING) ISLANDS', N'CC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (47, N'COLOMBIA', N'CO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (48, N'COMOROS', N'KM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (49, N'CONGO', N'CG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (50, N'CONGO, THE DEMOCRATIC REPUBLIC OF THE', N'CD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (51, N'COOK ISLANDS', N'CK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (52, N'COSTA RICA', N'CR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (53, N'COTE D''IVOIRE', N'CI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (54, N'CROATIA', N'HR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (55, N'CUBA', N'CU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (56, N'CYPRUS', N'CY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (57, N'CZECH REPUBLIC', N'CZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (58, N'DENMARK', N'DK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (59, N'DJIBOUTI', N'DJ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (60, N'DOMINICA', N'DM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (61, N'DOMINICAN REPUBLIC', N'DO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (62, N'ECUADOR', N'EC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (63, N'EGYPT', N'EG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (64, N'EL SALVADOR', N'SV')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (65, N'EQUATORIAL GUINEA', N'GQ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (66, N'ERITREA', N'ER')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (67, N'ESTONIA', N'EE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (68, N'ETHIOPIA', N'ET')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (69, N'FALKLAND ISLANDS (MALVINAS)', N'FK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (70, N'FAROE ISLANDS', N'FO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (71, N'FIJI', N'FJ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (72, N'FINLAND', N'FI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (73, N'FRANCE', N'FR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (74, N'FRENCH GUIANA', N'GF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (75, N'FRENCH POLYNESIA', N'PF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (76, N'FRENCH SOUTHERN TERRITORIES', N'TF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (77, N'GABON', N'GA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (78, N'GAMBIA', N'GM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (79, N'GEORGIA', N'GE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (80, N'GERMANY', N'DE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (81, N'GHANA', N'GH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (82, N'GIBRALTAR', N'GI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (83, N'GREECE', N'GR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (84, N'GREENLAND', N'GL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (85, N'GRENADA', N'GD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (86, N'GUADELOUPE', N'GP')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (87, N'GUAM', N'GU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (88, N'GUATEMALA', N'GT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (89, N'GUINEA', N'GN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (90, N'GUINEA-BISSAU', N'GW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (91, N'GUYANA', N'GY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (92, N'HAITI', N'HT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (93, N'HEARD ISLAND AND MCDONALD ISLANDS', N'HM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (94, N'HOLY SEE (VATICAN CITY STATE)', N'VA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (95, N'HONDURAS', N'HN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (96, N'HONG KONG', N'HK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (97, N'HUNGARY', N'HU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (98, N'ICELAND', N'IS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (99, N'INDIA', N'IN')
GO
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (100, N'INDONESIA', N'ID')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (101, N'IRAN, ISLAMIC REPUBLIC OF', N'IR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (102, N'IRAQ', N'IQ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (103, N'IRELAND', N'IE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (104, N'ISRAEL', N'IL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (105, N'ITALY', N'IT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (106, N'JAMAICA', N'JM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (107, N'JAPAN', N'JP')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (108, N'JORDAN', N'JO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (109, N'KAZAKHSTAN', N'KZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (110, N'KENYA', N'KE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (111, N'KIRIBATI', N'KI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (112, N'KOREA, DEMOCRATIC PEOPLE''S REPUBLIC OF', N'KP')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (113, N'KOREA, REPUBLIC OF', N'KR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (114, N'KUWAIT', N'KW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (115, N'KYRGYZSTAN', N'KG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (116, N'LAO PEOPLE''S DEMOCRATIC REPUBLIC', N'LA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (117, N'LATVIA', N'LV')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (118, N'LEBANON', N'LB')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (119, N'LESOTHO', N'LS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (120, N'LIBERIA', N'LR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (121, N'LIBYAN ARAB JAMAHIRIYA', N'LY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (122, N'LIECHTENSTEIN', N'LI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (123, N'LITHUANIA', N'LT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (124, N'LUXEMBOURG', N'LU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (125, N'MACAO', N'MO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (126, N'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', N'MK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (127, N'MADAGASCAR', N'MG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (128, N'MALAWI', N'MW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (129, N'MALAYSIA', N'MY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (130, N'MALDIVES', N'MV')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (131, N'MALI', N'ML')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (132, N'MALTA', N'MT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (133, N'MARSHALL ISLANDS', N'MH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (134, N'MARTINIQUE', N'MQ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (135, N'MAURITANIA', N'MR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (136, N'MAURITIUS', N'MU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (137, N'MAYOTTE', N'YT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (138, N'MEXICO', N'MX')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (139, N'MICRONESIA, FEDERATED STATES OF', N'FM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (140, N'MOLDOVA, REPUBLIC OF', N'MD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (141, N'MONACO', N'MC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (142, N'MONGOLIA', N'MN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (143, N'MONTSERRAT', N'MS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (144, N'MOROCCO', N'MA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (145, N'MOZAMBIQUE', N'MZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (146, N'MYANMAR', N'MM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (147, N'NAMIBIA', N'NA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (148, N'NAURU', N'NR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (149, N'NEPAL', N'NP')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (150, N'NETHERLANDS', N'NL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (151, N'NETHERLANDS ANTILLES', N'AN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (152, N'NEW CALEDONIA', N'NC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (153, N'NEW ZEALAND', N'NZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (154, N'NICARAGUA', N'NI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (155, N'NIGER', N'NE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (156, N'NIGERIA', N'NG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (157, N'NIUE', N'NU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (158, N'NORFOLK ISLAND', N'NF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (159, N'NORTHERN MARIANA ISLANDS', N'MP')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (160, N'NORWAY', N'NO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (161, N'OMAN', N'OM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (162, N'PAKISTAN', N'PK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (163, N'PALAU', N'PW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (164, N'PALESTINIAN TERRITORY, OCCUPIED', N'PS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (165, N'PANAMA', N'PA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (166, N'PAPUA NEW GUINEA', N'PG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (167, N'PARAGUAY', N'PY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (168, N'PERU', N'PE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (169, N'PHILIPPINES', N'PH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (170, N'PITCAIRN', N'PN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (171, N'POLAND', N'PL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (172, N'PORTUGAL', N'PT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (173, N'PUERTO RICO', N'PR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (174, N'QATAR', N'QA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (175, N'REUNION', N'RE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (176, N'ROMANIA', N'RO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (177, N'RUSSIAN FEDERATION', N'RU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (178, N'RWANDA', N'RW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (179, N'SAINT HELENA', N'SH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (180, N'SAINT KITTS AND NEVIS', N'KN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (181, N'SAINT LUCIA', N'LC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (182, N'SAINT PIERRE AND MIQUELON', N'PM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (183, N'SAINT VINCENT AND THE GRENADINES', N'VC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (184, N'SAMOA', N'WS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (185, N'SAN MARINO', N'SM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (186, N'SAO TOME AND PRINCIPE', N'ST')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (187, N'SAUDI ARABIA', N'SA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (188, N'SENEGAL', N'SN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (189, N'SERBIA AND MONTENEGRO', N'CS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (190, N'SEYCHELLES', N'SC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (191, N'SIERRA LEONE', N'SL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (192, N'SINGAPORE', N'SG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (193, N'SLOVAKIA', N'SK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (194, N'SLOVENIA', N'SI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (195, N'SOLOMON ISLANDS', N'SB')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (196, N'SOMALIA', N'SO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (197, N'SOUTH AFRICA', N'ZA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (198, N'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', N'GS')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (199, N'SPAIN', N'ES')
GO
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (200, N'SRI LANKA', N'LK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (201, N'SUDAN', N'SD')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (202, N'SURINAME', N'SR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (203, N'SVALBARD AND JAN MAYEN', N'SJ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (204, N'SWAZILAND', N'SZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (205, N'SWEDEN', N'SE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (206, N'SWITZERLAND', N'CH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (207, N'SYRIAN ARAB REPUBLIC', N'SY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (208, N'TAIWAN, PROVINCE OF CHINA', N'TW')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (209, N'TAJIKISTAN', N'TJ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (210, N'TANZANIA, UNITED REPUBLIC OF', N'TZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (211, N'THAILAND', N'TH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (212, N'TIMOR-LESTE', N'TL')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (213, N'TOGO', N'TG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (214, N'TOKELAU', N'TK')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (215, N'TONGA', N'TO')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (216, N'TRINIDAD AND TOBAGO', N'TT')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (217, N'TUNISIA', N'TN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (218, N'TURKEY', N'TR')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (219, N'TURKMENISTAN', N'TM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (220, N'TURKS AND CAICOS ISLANDS', N'TC')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (221, N'TUVALU', N'TV')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (222, N'UGANDA', N'UG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (223, N'UKRAINE', N'UA')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (224, N'UNITED ARAB EMIRATES', N'AE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (225, N'UNITED KINGDOM', N'GB')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (226, N'UNITED STATES', N'US')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (227, N'UNITED STATES MINOR OUTLYING ISLANDS', N'UM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (228, N'URUGUAY', N'UY')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (229, N'UZBEKISTAN', N'UZ')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (230, N'VANUATU', N'VU')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (231, N'VENEZUELA', N'VE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (232, N'VIET NAM', N'VN')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (233, N'VIRGIN ISLANDS, BRITISH', N'VG')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (234, N'VIRGIN ISLANDS, U.S.', N'VI')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (235, N'WALLIS AND FUTUNA', N'WF')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (236, N'WESTERN SAHARA', N'EH')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (237, N'YEMEN', N'YE')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (238, N'ZAMBIA', N'ZM')
INSERT [dbo].[DictionaryCountry] ([Id], [Name], [Code]) VALUES (239, N'ZIMBABWE', N'ZW')
SET IDENTITY_INSERT [dbo].[DictionaryCountry] OFF
GO
SET IDENTITY_INSERT [dbo].[DictionaryCounty] ON 

INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (1, N'Dolj', N'DJ')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (2, N'Bacau', N'BC')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (3, N'Harghita', N'HR')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (4, N'Bistri?a-Nasaud', N'BN')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (5, N'Dâmbovi?a', N'DB')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (6, N'Suceava', N'SV')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (7, N'Boto?ani', N'BT')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (8, N'Bra?ov', N'BV')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (9, N'Bucure?ti', N'B')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (10, N'Braila', N'BR')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (11, N'Hunedoara', N'HD')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (12, N'Teleorman', N'TR')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (13, N'Covasna', N'CV')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (14, N'Tulcea', N'TL')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (15, N'Timi?', N'TM')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (16, N'Buzau', N'BZ')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (17, N'Prahova', N'PH')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (18, N'Ilfov', N'IF')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (19, N'Neam?', N'NT')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (20, N'Cluj', N'CJ')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (21, N'Alba', N'AB')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (22, N'Giurgiu', N'GR')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (23, N'Arge?', N'AG')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (24, N'Calara?i', N'CL')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (25, N'Bihor', N'BH')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (26, N'Ia?i', N'IS')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (27, N'Vâlcea', N'VL')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (28, N'Vrancea', N'VN')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (29, N'Arad', N'AR')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (30, N'Ialomi?a', N'IL')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (31, N'Cara?-Severin', N'CS')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (32, N'Gala?i', N'GL')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (33, N'Gorj', N'GJ')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (34, N'Constan?a', N'CT')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (35, N'Satu Mare', N'SM')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (36, N'Maramure?', N'MM')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (37, N'Mehedin?i', N'MH')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (38, N'Salaj', N'SJ')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (39, N'Vaslui', N'VS')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (40, N'Mure?', N'MS')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (41, N'Sibiu', N'SB')
INSERT [dbo].[DictionaryCounty] ([Id], [Name], [Code]) VALUES (42, N'Olt', N'OT')
SET IDENTITY_INSERT [dbo].[DictionaryCounty] OFF
GO
SET IDENTITY_INSERT [dbo].[DictionaryStatus] ON 

INSERT [dbo].[DictionaryStatus] ([Id], [Name], [Code]) VALUES (1, N'Joined', N'JOD')
INSERT [dbo].[DictionaryStatus] ([Id], [Name], [Code]) VALUES (2, N'Withdrawn', N'WDN')
INSERT [dbo].[DictionaryStatus] ([Id], [Name], [Code]) VALUES (3, N'Attended', N'ATD')
SET IDENTITY_INSERT [dbo].[DictionaryStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[Location] ON 


INSERT [dbo].[Location] ([Id], [Name], [Code], [CountryId], [Address], [CountyId], [CityId], [Latitude], [Longitude]) VALUES (1, N'TotalSoft', NULL, 6, N'sos. Bucuresti Nord nr. 10', 6, 1, NULL, NULL)
INSERT [dbo].[Location] ([Id], [Name], [Code], [CountryId], [Address], [CountyId], [CityId], [Latitude], [Longitude]) VALUES (2, N'Remote', NULL, 9, NULL, 9, 2, NULL, NULL)

SET IDENTITY_INSERT [dbo].[Location] OFF
GO

SET IDENTITY_INSERT [dbo].[Speaker] ON 

INSERT [dbo].[Speaker] ([Id], [Name], [Nationality], [Rating], [Image]) VALUES (1, N'Capatina Alexandra', N'romania', CAST(5.00 AS Decimal(5, 2)), NULL)
INSERT [dbo].[Speaker] ([Id], [Name], [Nationality], [Rating], [Image]) VALUES (2, N'Dragos Rosca', N'ro', CAST(4.00 AS Decimal(5, 2)), NULL)
INSERT [dbo].[Speaker] ([Id], [Name], [Nationality], [Rating], [Image]) VALUES (3, N'Diaconita Costi', N'ro', CAST(5.00 AS Decimal(5, 2)), NULL)
SET IDENTITY_INSERT [dbo].[Speaker] OFF
GO
ALTER TABLE [dbo].[Conference]  WITH CHECK ADD  CONSTRAINT [FK_Conference_DictionaryCategory] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[DictionaryCategory] ([Id])
GO
ALTER TABLE [dbo].[Conference] CHECK CONSTRAINT [FK_Conference_DictionaryCategory]
GO
ALTER TABLE [dbo].[Conference]  WITH CHECK ADD  CONSTRAINT [FK_Conference_DictionaryConferenceType] FOREIGN KEY([ConferenceTypeId])
REFERENCES [dbo].[DictionaryConferenceType] ([Id])
GO
ALTER TABLE [dbo].[Conference] CHECK CONSTRAINT [FK_Conference_DictionaryConferenceType]
GO
ALTER TABLE [dbo].[Conference]  WITH CHECK ADD  CONSTRAINT [FK_Conference_Location] FOREIGN KEY([LocationId])
REFERENCES [dbo].[Location] ([Id])
GO
ALTER TABLE [dbo].[Conference] CHECK CONSTRAINT [FK_Conference_Location]
GO
ALTER TABLE [dbo].[ConferenceXAttendee]  WITH CHECK ADD  CONSTRAINT [FK_ConferenceXAttendee_Conference] FOREIGN KEY([ConferenceId])
REFERENCES [dbo].[Conference] ([Id])
GO
ALTER TABLE [dbo].[ConferenceXAttendee] CHECK CONSTRAINT [FK_ConferenceXAttendee_Conference]
GO
ALTER TABLE [dbo].[ConferenceXAttendee]  WITH CHECK ADD  CONSTRAINT [FK_ConferenceXAttendee_DictionaryStatus] FOREIGN KEY([StatusId])
REFERENCES [dbo].[DictionaryStatus] ([Id])
GO
ALTER TABLE [dbo].[ConferenceXAttendee] CHECK CONSTRAINT [FK_ConferenceXAttendee_DictionaryStatus]
GO
ALTER TABLE [dbo].[ConferenceXSpeaker]  WITH CHECK ADD  CONSTRAINT [FK_ConferenceXSpeaker_Conference] FOREIGN KEY([ConferenceId])
REFERENCES [dbo].[Conference] ([Id])
GO
ALTER TABLE [dbo].[ConferenceXSpeaker] CHECK CONSTRAINT [FK_ConferenceXSpeaker_Conference]
GO
ALTER TABLE [dbo].[ConferenceXSpeaker]  WITH CHECK ADD  CONSTRAINT [FK_ConferenceXSpeaker_Speaker] FOREIGN KEY([SpeakerId])
REFERENCES [dbo].[Speaker] ([Id])
GO
ALTER TABLE [dbo].[ConferenceXSpeaker] CHECK CONSTRAINT [FK_ConferenceXSpeaker_Speaker]
GO
ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_DictionaryCity] FOREIGN KEY([CityId])
REFERENCES [dbo].[DictionaryCity] ([Id])
GO
ALTER TABLE [dbo].[Location] CHECK CONSTRAINT [FK_Location_DictionaryCity]
GO
ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_DictionaryCountry] FOREIGN KEY([CountryId])
REFERENCES [dbo].[DictionaryCountry] ([Id])
GO
ALTER TABLE [dbo].[Location] CHECK CONSTRAINT [FK_Location_DictionaryCountry]
GO
ALTER TABLE [dbo].[Location]  WITH CHECK ADD  CONSTRAINT [FK_Location_DictionaryCounty] FOREIGN KEY([CountyId])
REFERENCES [dbo].[DictionaryCounty] ([Id])
GO
ALTER TABLE [dbo].[Location] CHECK CONSTRAINT [FK_Location_DictionaryCounty]
GO
