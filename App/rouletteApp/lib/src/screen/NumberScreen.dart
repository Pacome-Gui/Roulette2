import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:vibration/vibration.dart';

class NumberScreen extends StatefulWidget {
  const NumberScreen({Key? key}) : super(key: key);

  @override
  State<NumberScreen> createState() => _NumberScreen();
}


enum Number {
  ZERO(id:0, value: "0", color:"GREEN"),
DOUBLE_ZERO(id: 1, value: "00", color: "GREEN"),
ONE(id: 1, value: "1", color: "RED"),
TWO(id: 1, value: "2", color: "BLACK"),
THREE(id: 1, value: "3", color: "RED"),
FOUR(id: 1, value: "4", color: "BLACK"),
FIVE(id: 1, value: "5", color: "RED"),
SIX(id: 1, value: "6", color: "BLACK"),
SEVEN(id: 1, value: "7", color: "RED"),
EIGHT(id: 1, value: "8", color: "BLACK"),
NINE(id: 1, value: "9", color: "RED"),
TEN(id: 1, value: "10", color: "BLACK"),
ELEVEN(id: 1, value: "11", color: "BLACK"),
TWELVE(id: 1, value: "12", color: "RED"),
THIRTEEN(id: 1, value: "13", color: "BLACK"),
FOURTEEN(id: 1, value: "14", color: "RED"),
FIVETEEN(id: 1, value: "15", color: "BLACK"),
SIXTEEN(id: 1, value: "16", color: "RED"),
SEVENTEEN(id: 1, value: "17", color: "BLACK"),
EIGHTEEN(id: 1, value: "18", color: "RED"),
NINETEEN(id: 1, value: "19", color: "RED"),
TWENTY(id: 1, value: "20", color: "BLACK"),
TWENTY_ONE(id: 1, value: "21", color: "RED"),
TWENTY_TWO(id: 1, value: "22", color: "BLACK"),
TWENTY_THREE(id: 1, value: "23", color: "RED"),
TWENTY_FOUR(id: 1, value: "24", color: "BLACK"),
TWENTY_FIVE(id: 1, value: "25", color: "RED"),
TWENTY_SIX(id: 1, value: "26", color: "BLACK"),
TWENTY_SEVEN(id: 1, value: "27", color: "RED"),
TWENTY_EIGHT(id: 1, value: "28", color: "BLACK"),
TWENTY_NINE(id: 1, value: "29", color: "BLACK"),
THIRTY(id: 1, value: "30", color: "RED"),
THIRTY_ONE(id: 1, value: "31", color: "BLACK"),
THIRTY_TWO(id: 1, value: "32", color: "RED"),
THIRTY_THREE(id: 1, value: "33", color: "BLACK"),
THIRTY_FOUR(id: 1, value: "34", color: "RED"),
THIRTY_FIVE(id: 1, value: "35", color: "BLACK"),
THIRTY_SIX(id: 1, value: "36", color: "RED");


const Number({
required this.id,
required this.value,
required this.color
});

final int id;
final String value;
final String color;

getColor() {
  switch(color) {
    case "BLACK":
      return Colors.black;
    case "RED":
      return Colors.red;
    default:
      return Colors.green;
  }
}

getWidget() {
  return GestureDetector(
    onTap: (){
      _NumberScreen.addNumber(this);
    },
    child: Container(
      //margin: const EdgeInsets.all(5),
        decoration: BoxDecoration(
          shape: BoxShape.rectangle,
          color: getColor(),
        ),
        width: 100,
        height: 45,


        child: Column(
          children: [
            Spacer(),
            Text(value,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
            Spacer()
          ],
        )
    ),
  );
}
}


deleteLastNumber() {
  http.delete(
    Uri.parse('http://192.168.1.19:6060/numbers/last'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    }
  );
  Vibration.vibrate(duration: 450, amplitude: 5000);
  Fluttertoast.showToast(
      msg: "Dernier nombre supprimé",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      backgroundColor: const Color(0xffC0392B),
      textColor: Colors.white,
      fontSize: 16.0
  );
}

class _NumberScreen extends State<NumberScreen> {
  static late FToast fToast;

  @override
  void initState() {
    super.initState();
    fToast = FToast();
    fToast.init(context);
  }

  getNumberWidgets() {
    List<Widget> numberWidgets = [];
    for (var number in Number.values) {
      if (number == Number.ZERO || number == Number.DOUBLE_ZERO) {
        continue;
      }
      numberWidgets.addAll({
          number.getWidget()
        }
      );
    }
    return numberWidgets;
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            body: GestureDetector (
                onPanUpdate: (details) {
                  // Swiping in right direction.
                  if (details.delta.dx > 0) {
                    context.go("/sms");
                  }

                  // Swiping in left direction.
                  if (details.delta.dx < 0) {}
                },
        child: Center(
              child: Column(
                children: [
                  const Spacer(),
                  Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    child: Wrap(
                      spacing: 10,
                      alignment: WrapAlignment.center,
                      children: [
                        Number.ZERO.getWidget(),
                        Number.DOUBLE_ZERO.getWidget(),
                    GestureDetector(
                        onLongPress: () {
                          deleteLastNumber();
                        },
                          child:Container(
                          //margin: const EdgeInsets.all(5),
                          decoration: BoxDecoration(
                          shape: BoxShape.rectangle,
                          border: Border.all(color: Colors.black12)
                          ),
                          width: 100,
                          height: 45,

                          child: Column(
                          children: const [
                          Spacer(),
                          Icon(
                          Icons.settings_backup_restore,
                          color: Colors.red,
                          size: 24.0,
                          ),
                          Spacer()
                          ],
                          )
                          ))
                          ],
                          ),
                          ),
                          Wrap(
                          spacing: 10,
                          runSpacing: 10,
                          alignment: WrapAlignment.center,

                    children: getNumberWidgets(),
                  ),
                  const Spacer()
                ],
              )
            )
            )
        )
    );
  }



  static _showToast(Number number) {
    Widget toast = Container(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 12.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25.0),
        color: Colors.greenAccent,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.check),
          const SizedBox(
            width: 12.0,
          ),
          Text("Ajout du nombre ${number.value}   "),
          Container(
            color: number.getColor(),
            height: 20,
            width: 20,
          )
        ],
      ),
    );

    fToast.showToast(
      child: toast,
      gravity: ToastGravity.BOTTOM,
      toastDuration: Duration(seconds: 2),
    );
  }

  static addNumber(Number number) {
    http.post(
      Uri.parse('http://192.168.1.19:6060/numbers'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'number': number.value,
        'color': number.color
      }),
    );
    Vibration.vibrate(duration: 125, amplitude: 128);
    _showToast(number);
  }
}
