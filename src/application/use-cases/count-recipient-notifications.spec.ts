import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('shoud be able to count recipient notifications', async () => {
    const notificationsRepsository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepsository,
    );

    await notificationsRepsository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepsository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepsository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
