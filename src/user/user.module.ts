import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://dtqrsesy:bT2AyYaZpfFNd-qcnGeY2B_QWLwCOQbD@vulture.rmq.cloudamqp.com/dtqrsesy'],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          }
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}