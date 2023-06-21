import DateUtils from "Utils/Date";
import AlertActions from "Store/Alert";
import ModalActions from "Store/Modals";
import EventsAPI from "Http/api/events";
import EventFactory from "Factory/Event";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Leads } from "Http/api";
import dayjs from "dayjs";

const create = createAsyncThunk(
  "events/create",
  async (payload, { dispatch }) => {
    const event = EventFactory.makeEventPayload(payload);

    const leadName = payload.attendies?.companyDetails?.companyName;
    const eventType =
      payload.type.split("")[0].toUpperCase() +
      payload.type.split("").splice(1).join("");

    const date = DateUtils.format("", event.date);
    const time = new Date(payload.start)
      .toISOString()
      .split("T")[1]
      .split("")
      .splice(0, 5)
      .join("");

    const res = await EventsAPI.create(event).catch((err) => {
      throw new Error("Failed to create event.");
    });

    let startdate = dayjs(payload.start).format("h:mm A")
    const notificationPayload = {
      // notificationId: "1933",
      notificationCode: "dlpm-events-followUp",
      emailTo: payload.attendies?.primaryContactDetails?.email,
      inputValue: {
        lead: leadName,
        eventType: payload.type,
        executive: payload.attendies?.primaryContactDetails?.name,
        Date: date,
        time: startdate
      }
    }
    const Notificationres = await Leads.shareNotification(notificationPayload);

    dispatch(ModalActions.close("eventForm"));
    dispatch(
      AlertActions.open({
        type: "Success",
        message: `${eventType} Sheduled successfully on ${date} at ${startdate} with ${leadName}.`,
      })
    );

    return res;
  }
);

const load = createAsyncThunk("events/load", async (payload, { dispatch }) => {
  const events = await EventsAPI.get();
  return events;
});

export default {
  load,
  create,
};
