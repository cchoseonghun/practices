import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, UsersModule, OrdersModule, PaymentsModule, ProductsModule]
})
export class AppModule {}
