import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
    sender : Principal;
  };

  type Sender = {
    principal : Principal;
    name : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Nat.compare(inquiry1.id, inquiry2.id);
    };

    public func compareByTimestamp(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Int.compare(inquiry1.timestamp, inquiry2.timestamp);
    };
  };

  var nextId = 0;
  let inquiries = List.empty<Inquiry>();

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      id = nextId;
      name;
      email;
      message;
      timestamp = 0;
      sender = caller;
    };
    nextId += 1;
    inquiries.add(inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.toArray();
  };

  public query ({ caller }) func getInquiryById(id : Nat) : async Inquiry {
    switch (inquiries.find(func(inquiry) { inquiry.id == id })) {
      case (?inquiry) { inquiry };
      case (null) { Runtime.trap("Inquiry does not exist") };
    };
  };
};
