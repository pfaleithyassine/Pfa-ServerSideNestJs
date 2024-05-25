import { PartialType } from "@nestjs/mapped-types";
import { AgentSellerDto } from "./agentSeller.dto";

export class updateAgentSellerDto extends PartialType(AgentSellerDto){
    
}
