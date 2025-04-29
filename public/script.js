let reminderCount = 0;
const maxReminders = 3;

document.addEventListener('DOMContentLoaded', () => {
  const reminderContainer = document.getElementById('reminderContainer');
  const addBtn = document.getElementById('addReminderBtn');
  const form = document.getElementById('eventForm');

  function createReminderSection(index) {
    return `
      <div class="event-section mb-4 border p-3 rounded shadow-sm" data-index="${index}">
        <h6 class="mb-3">Reminder ${index + 1}</h6>
        <div class="row g-3">
          <div class="col-md-6">
            <input type="text" class="form-control" name="eventName[]" placeholder="Event Name" required>
          </div>
          <div class="col-md-6">
            <input type="date" class="form-control" name="eventDate[]" required>
          </div>
          <div class="col-md-6">
            <input type="email" class="form-control" name="customerEmail[]" placeholder="Customer Email" required>
          </div>
          <div class="col-md-6">
            <select class="form-select eventTypeSelect" name="eventType[]" required>
              <option value="">Select Event Type</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="col-md-12 otherTypeField d-none">
            <input type="text" class="form-control mt-2" name="otherType[]" placeholder="Specify Event Type">
          </div>
        </div>
      </div>`;
  }

  function addReminder() {
    if (reminderCount >= maxReminders) {
      alert("You can only add up to 3 reminders.");
      return;
    }

    reminderContainer.insertAdjacentHTML('beforeend', createReminderSection(reminderCount));
    attachEventTypeListener(reminderCount);
    reminderCount++;
  }

  function attachEventTypeListener(index) {
    const section = document.querySelector(`.event-section[data-index="${index}"]`);
    const select = section.querySelector('.eventTypeSelect');
    const otherField = section.querySelector('.otherTypeField');

    select.addEventListener('change', (e) => {
      otherField.classList.toggle('d-none', e.target.value !== 'Other');
    });
  }

  addBtn.addEventListener('click', addReminder);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sections = document.querySelectorAll('.event-section');
    const reminders = [];

    sections.forEach(section => {
      const eventName = section.querySelector('[name="eventName[]"]').value.trim();
      const eventDate = section.querySelector('[name="eventDate[]"]').value;
      const customerEmail = section.querySelector('[name="customerEmail[]"]').value.trim();
      const eventType = section.querySelector('[name="eventType[]"]').value;
      const otherTypeInput = section.querySelector('[name="otherType[]"]');
      const otherType = otherTypeInput && !otherTypeInput.classList.contains('d-none')
        ? otherTypeInput.value.trim()
        : "";

      reminders.push({ eventName, eventDate, customerEmail, eventType, otherType });
    });

    try {
      const res = await fetch('http://localhost:3000/submit-reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reminders)
      });

      const result = await res.json();
      alert(result.message);
      if (res.ok) {
        form.reset();
        reminderContainer.innerHTML = '';
        reminderCount = 0;
        addReminder(); // Re-add first section
      }
    } catch (error) {
      alert('Failed to submit reminders. Please try again.');
      console.error(error);
    }
  });

  // Initialize with first reminder
  addReminder();
});
