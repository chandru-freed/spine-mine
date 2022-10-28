
import * as Data from '@/../src-gen/data';
import { TicketSummaryGetters } from '@/../src-gen/store/ticket-store-support';

export class TicketTaskSummaryInit {
  public static initState(): Data.Ticket.TicketTaskSummary { return new Data.Ticket.TicketTaskSummary(); }
}

export class TicketSummaryGettersCode implements TicketSummaryGetters {

  public ticketTaskDetails(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketTaskDetails {
    return state.ticketTaskDetails
  }

  public ticketCommentsList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketCommentDetails[] {
    return state.ticketCommentsList
  }

  public fiCFTicketActiveList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketTaskDetailsGet[] {
    return state.fiCFTicketActiveList
  }
  public fiMyCFTicketCompletedList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketTaskDetailsGet[] {
    return state.fiMyCFTicketCompletedList
  }
}
