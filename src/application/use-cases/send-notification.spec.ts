import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('shoud be able to send a notification', async () => {
    const notificationsRepsository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepsository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepsository.notifications).toHaveLength(1);
    expect(notificationsRepsository.notifications[0]).toEqual(notification);
  });
});
