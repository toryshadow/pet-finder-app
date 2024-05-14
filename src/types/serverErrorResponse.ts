export type TServerErrorResponse = {
	detail:
		| {
				message: string;
				status_code?: number;
				success: boolean;
		  }
		| string;
};
