
import * as Data from '@/../src-gen/data';
import { TicketSummaryMutations } from '@/../src-gen/store/ticket-store-support';

export class TicketSummaryMutationsCode implements TicketSummaryMutations {


  public setTicketTaskDetails(state: Data.Ticket.TicketTaskSummary, ticketTaskDetails: Data.Ticket.MyTicketTaskDetails): void {
    state.ticketTaskDetails = ticketTaskDetails;
  }

  public setTicketTaskCommentList(state: Data.Ticket.TicketTaskSummary, ticketCommentsList: Data.Ticket.MyTicketCommentDetails[]): void {
    state.ticketCommentsList = ticketCommentsList;
  }


}

