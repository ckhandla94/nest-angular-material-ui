import { Controller, Body, Post, UseGuards, Param, Get } from '@nestjs/common';
import { StripeChargeInput } from 'src/models';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {

    }

    @Post('charge')
    @UseGuards(AuthGuard('jwt'))
    async charge(@Body() req: StripeChargeInput) {
        return this.paymentService.charge(req);
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async get() {
        return this.paymentService.get();
    }

    @Get('transaction/:transactionId')
    @UseGuards(AuthGuard('jwt'))
    async getByTransactionId(@Param('transactionId') transactionId) {
        return this.paymentService.getByTransactionId(transactionId);
    }
}
