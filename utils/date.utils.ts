import { parseISO } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

type DateFormat = 'yyyy-MM-dd' | 'dd. MMMM yyyy' | 'dd/MM/yyyy' | 'dd/MM/yyyy HH:mm' | 'dd/MM/yyyy, HH:mm' | 'yyyy-MM'

// Discarding time from ISO string because C# may use more chars for time part, what throws errors on JS side
export const formatDate = (date: Date | string, format: DateFormat = 'dd/MM/yyyy') =>
  formatInTimeZone(typeof date == 'string' ? parseISO(date) : date, 'Europe/Warsaw', format)
