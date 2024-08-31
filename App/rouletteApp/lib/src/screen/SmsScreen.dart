import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_sms_inbox/flutter_sms_inbox.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:permission_handler/permission_handler.dart';
import 'package:vibration/vibration.dart';

class SmsScreen extends StatefulWidget {
  const SmsScreen({Key? key}) : super(key: key);

  @override
  State<SmsScreen> createState() => _SmsScreenState();
}

class _SmsScreenState extends State<SmsScreen> {
  final SmsQuery _query = SmsQuery();
  List<SmsMessage> _messages = [];
  static List<int> _treatedMessages = [];

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter SMS Inbox App',
      theme: ThemeData(
        primarySwatch: Colors.teal,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('SMS Inbox Example'),
        ),
        body: GestureDetector (
        onPanUpdate: (details) {
            // Swiping in right direction.
              if (details.delta.dx > 0) {

            }

            // Swiping in left direction.
              if (details.delta.dx < 0) {}
              context.go("/");
            },
    child: Container(
          child: _messages.isNotEmpty
              ? _MessagesListView(
            messages: _messages,
          )
              : Center(
            child: Text(
              'No messages to show.\n Tap refresh button...',
              style: Theme.of(context).textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
          ),
        )),
        floatingActionButton: FloatingActionButton(
          onPressed: () async {
            var permission = await Permission.sms.status;
            if (permission.isGranted) {
              final messages = await _query.querySms(
                kinds: [
                  SmsQueryKind.inbox,
                ],

                // address: '+254712345789',
                count: 10,
              );
              debugPrint('sms inbox messages: ${messages.length}');

              setState(() => {
                _messages.clear(),
                messages.forEach((element)
               {
                if (!_SmsScreenState._treatedMessages.contains(element.id)) {
                  _messages.add(element);
                }
              })});
            } else {
              await Permission.sms.request();
            }
          },
          child: const Icon(Icons.refresh),
        ),
      ),
    );
  }
}

class _MessagesListView extends StatefulWidget {
  const _MessagesListView({
    Key? key,
    required this.messages,
  }) : super(key: key);

  final List<SmsMessage> messages;

  @override
  State<_MessagesListView> createState() => _MessagesListViewState(messages);
}

class _MessagesListViewState extends State<_MessagesListView>{

  List<SmsMessage> messages;

  _MessagesListViewState(List<SmsMessage> this.messages);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      shrinkWrap: true,
      itemCount: messages.length,
      itemBuilder: (BuildContext context, int i) {
        var message = messages[i];

        return Container(
            decoration: BoxDecoration(
              color: i%2 == 0 ? const Color(0xb0d1edFF) : Colors.white,
            ),
            padding: EdgeInsets.all(7),
            child : Column(
              children: [
                Row( children : [
                  Text('${message.sender}', style: TextStyle(fontWeight: FontWeight.w900, )),
                  Spacer()
                ]),
                Row(
                  children: [
                    Container(
                      constraints: BoxConstraints(minWidth: 100, maxWidth: 245),
                      child: Text('${message.body}', textAlign: TextAlign.left),

                    ),
                    Spacer(),
                    SizedBox(
                        height: 45,
                        width: 45,
                        child: TextButton(
                          style: TextButton.styleFrom(
                            backgroundColor: Colors.green,
                            foregroundColor: Colors.white,
                          ),
                          onPressed: () {
                            _SmsScreenState._treatedMessages.add(message.id!);
                            setState(() {
                              List<SmsMessage> temp = [];
                                    for (var element in messages) {
                                    if (!_SmsScreenState._treatedMessages.contains(element.id)) {
                                    temp.add(element);
                                    }}
                                    messages = temp;
                            });

                            http.post(
                              Uri.parse('http://192.168.1.19:6060/messages'),
                              headers: <String, String>{
                                'Content-Type': 'application/json; charset=UTF-8',
                              },
                              body: jsonEncode(<String, String>{
                                'text': message.body!,
                                'author' : message.address!
                              }),
                            );
                            Vibration.vibrate(duration: 125, amplitude: 128);
                          },
                          child: Icon(Icons.check),
                        )),
                    Container(width: 5,),
                    SizedBox(
                        height: 45,
                        width: 45,
                        child: TextButton(
                          style: ButtonStyle(
                            foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                            backgroundColor: MaterialStateProperty.all<Color>(Colors.red),
                          ),
                          onPressed: () {
                            _SmsScreenState._treatedMessages.add(message.id!);
                            setState(() {
                              List<SmsMessage> temp = [];
                              for (var element in messages) {
                                if (!_SmsScreenState._treatedMessages.contains(element.id)) {
                                  temp.add(element);
                                }}
                              messages = temp;
                            });

                          },
                          child: Icon(Icons.delete),
                        ))
                  ],
                ),

              ],
            )
        );
      },
    );
  }
}