
import * as Data from '@/../src-gen/data';
import { TicketSummaryGetters } from '@/../src-gen/store/ticket-store-support';

export class TicketTaskSummaryInit {
  public static initState(): Data.Ticket.TicketTaskSummary { return new Data.Ticket.TicketTaskSummary(); }
}

export class TicketSummaryGettersCode implements TicketSummaryGetters {

  public ticketTaskDetails(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketDetails {
    return state.ticketTaskDetails
  }

  public ticketCommentsList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketCommentDetails[] {
    return state.ticketCommentsList
  }

  public myTicketActiveList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketDetails[] {
    return state.myTicketActiveList;
  }

  public myTicketCompletedList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketDetails[] {
    return state.myTicketCompletedList;
  }

  public myTicketSubscribedList(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketDetails[] {
    return state.myTicketSubscribedList;
  }

  myTicketDashboardSummary(state: Data.Ticket.TicketTaskSummary): Data.Ticket.MyTicketDashboardSummary {
    const summary = state.myTicketDashboardSummary;
    summary.myActiveTicketCount = state.myTicketActiveList.length;
    summary.myCompletedTicketCount = state.myTicketCompletedList.length;
    summary.mySubscribedTicketCount = state.myTicketSubscribedList.length;
    summary.myTotalTicketCount = summary.myActiveTicketCount + summary.myCompletedTicketCount + summary.mySubscribedTicketCount;

    return summary;
  }
}
