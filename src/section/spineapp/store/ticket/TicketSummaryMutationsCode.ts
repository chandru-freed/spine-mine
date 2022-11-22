
import * as Data from '@/../src-gen/data';
import { TicketSummaryMutations } from '@/../src-gen/store/ticket-store-support';

export class TicketSummaryMutationsCode implements TicketSummaryMutations {

  public setTicketTaskDetails(state: Data.Ticket.TicketTaskSummary, ticketTaskDetails: Data.Ticket.MyTicketDetails): void {
    state.ticketTaskDetails = ticketTaskDetails;
  }

  public setTicketTaskCommentList(state: Data.Ticket.TicketTaskSummary, ticketCommentsList: Data.Ticket.MyTicketCommentDetails[]): void {
    state.ticketCommentsList = ticketCommentsList;
  }

  public updateMyTicketActiveList(state: Data.Ticket.TicketTaskSummary, myTicketActiveList: Data.Ticket.MyTicketDetails[]): void {
    state.myTicketActiveList = myTicketActiveList;
  }

  public updateMyTicketCompletedList(state: Data.Ticket.TicketTaskSummary, myTicketCompletedList: Data.Ticket.MyTicketDetails[]): void {
    state.myTicketCompletedList = myTicketCompletedList;
  }

  public updateMyTicketSubscribedList(state: Data.Ticket.TicketTaskSummary, myTicketSubscribedList: Data.Ticket.MyTicketDetails[]): void {
    state.myTicketSubscribedList = myTicketSubscribedList;
  }
}

