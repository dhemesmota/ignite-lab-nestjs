import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('shoud be able to cancel a notification', async () => {
    const notificationsRepsository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepsository);

    const notification = makeNotification();

    await notificationsRepsository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepsository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepsository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepsository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
