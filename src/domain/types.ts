export interface MoonData {
    monthName:         MonthName;
    firstDayMonth:     string;
    daysMonth:         string;
    nameDay:           NameDay[];
    nameMonth:         MonthName[];
    phase:             { [key: string]: Phase };
    month:             number;
    year:              number;
    receivedVariables: ReceivedVariables;
    lang:              Lang;
    language:          Language;
    title:             Title[];
    nextFullMoon:      string;
    autor:             string;
    version:           string;
}

export enum Autor {
    WdissenyCOM = "wdisseny.com",
}

export enum Lang {
    En = "en",
}

export enum Language {
    English = "English",
}

export enum MonthName {
    April = "April",
    August = "August",
    December = "December",
    February = "February",
    January = "January",
    July = "July",
    June = "June",
    March = "March",
    May = "May",
    November = "November",
    October = "October",
    September = "September",
}

export enum NameDay {
    Friday = "Friday",
    Monday = "Monday",
    Saturday = "Saturday",
    Sunday = "Sunday",
    Thursday = "Thursday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
}

export interface Phase {
    phaseName:    PhaseName;
    isPhaseLimit: boolean | number;
    lighting:     number;
    timeEvent:    false | string;
    dis:          number;
    dayWeek:      number;
    npWidget:     string;
}

export enum PhaseName {
    FirstQuarter = "First quarter",
    FullMoon = "Full moon",
    LastQuarter = "Last quarter",
    NewMoon = "New Moon",
    Waning = "Waning",
    Waxing = "Waxing",
}

export interface ReceivedVariables {
    month: string;
    year:  string;
    LDZ:   string;
}

export enum Title {
    MoonPhases = "Moon phases",
    MoonSCalendar = "Moon's calendar",
}